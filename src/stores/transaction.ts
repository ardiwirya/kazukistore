import { defineStore } from 'pinia'
import type { Game, PaymentMethod, Transaction, TopUpNominal, TransactionStatus } from '@/types'

interface CheckoutDraft {
  game: Game | null
  nominal: TopUpNominal | null
  playerId: string
  serverId: string
  paymentMethodId: string | null
}

interface TransactionState {
  draft: CheckoutDraft
  history: Transaction[]
  lastInvoiceId: string | null
}

const STORAGE_KEY = 'kazukistore_transactions'

function generateInvoiceId(): string {
  const date = new Date()
  const y = date.getFullYear().toString().slice(-2)
  const m = (date.getMonth() + 1).toString().padStart(2, '0')
  const d = date.getDate().toString().padStart(2, '0')
  const random = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `KZ${y}${m}${d}${random}`
}

function calculateFee(method: PaymentMethod, base: number): number {
  return method.feeType === 'percent' ? Math.round((base * method.fee) / 100) : method.fee
}

export const useTransactionStore = defineStore('transaction', {
  state: (): TransactionState => ({
    draft: { game: null, nominal: null, playerId: '', serverId: '', paymentMethodId: null },
    history: [],
    lastInvoiceId: null
  }),
  getters: {
    invoiceBySlug: (state) => (invoiceId: string) => state.history.find((t) => t.invoiceId === invoiceId)
  },
  actions: {
    hydrate() {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        try {
          this.history = JSON.parse(raw) as Transaction[]
        } catch {
          this.history = []
        }
      }
    },
    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.history))
    },
    setDraftGame(game: Game) {
      this.draft.game = game
      this.draft.nominal = null
    },
    setDraftNominal(nominal: TopUpNominal) {
      this.draft.nominal = nominal
    },
    setDraftIds(playerId: string, serverId: string) {
      this.draft.playerId = playerId
      this.draft.serverId = serverId
    },
    setDraftPayment(methodId: string) {
      this.draft.paymentMethodId = methodId
    },
    resetDraft() {
      this.draft = { game: null, nominal: null, playerId: '', serverId: '', paymentMethodId: null }
    },
    createTransaction(paymentMethod: PaymentMethod): Transaction | null {
      const { game, nominal, playerId, serverId } = this.draft
      if (!game || !nominal) return null

      const fee = calculateFee(paymentMethod, nominal.price)
      const transaction: Transaction = {
        invoiceId: generateInvoiceId(),
        gameSlug: game.slug,
        gameName: game.name,
        gameIcon: game.icon,
        gameGradientFrom: game.gradientFrom,
        gameGradientTo: game.gradientTo,
        nominalLabel: nominal.label,
        playerId,
        serverId: serverId || undefined,
        price: nominal.price,
        fee,
        total: nominal.price + fee,
        paymentMethod: paymentMethod.name,
        status: 'pending',
        createdAt: new Date().toISOString()
      }
      this.history.unshift(transaction)
      this.lastInvoiceId = transaction.invoiceId
      this.persist()
      return transaction
    },
    simulatePaymentResult(invoiceId: string, status: TransactionStatus) {
      const tx = this.history.find((t) => t.invoiceId === invoiceId)
      if (tx) {
        tx.status = status
        this.persist()
      }
    }
  }
})
