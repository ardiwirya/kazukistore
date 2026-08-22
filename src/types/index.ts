export type GameCategory =
  | 'moba'
  | 'battle-royale'
  | 'rpg'
  | 'fps'
  | 'casual'
  | 'voucher'
  | 'entertainment'

export interface IdField {
  key: 'playerId' | 'serverId' | 'zoneId' | 'username'
  label: string
  placeholder: string
  required: boolean
}

export interface TopUpNominal {
  id: string
  label: string
  amount: number
  currency: 'diamond' | 'uc' | 'coin' | 'point' | 'idr'
  price: number
  originalPrice?: number
  bonus?: string
  isPopular?: boolean
  isBestValue?: boolean
}

export interface Game {
  slug: string
  name: string
  publisher: string
  category: GameCategory
  categoryLabel: string
  icon: string
  gradientFrom: string
  gradientTo: string
  rating: number
  reviewCount: number
  soldCount: number
  isPopular: boolean
  isNew?: boolean
  description: string
  idFields: IdField[]
  helpText: string
  nominals: TopUpNominal[]
}

export interface PaymentMethod {
  id: string
  name: string
  group: 'e-wallet' | 'qris' | 'virtual-account' | 'retail'
  fee: number
  feeType: 'flat' | 'percent'
  icon: string
  isPopular?: boolean
}

export type TransactionStatus = 'pending' | 'processing' | 'success' | 'failed'

export interface Transaction {
  invoiceId: string
  gameSlug: string
  gameName: string
  gameIcon: string
  gameGradientFrom: string
  gameGradientTo: string
  nominalLabel: string
  playerId: string
  serverId?: string
  price: number
  fee: number
  total: number
  paymentMethod: string
  status: TransactionStatus
  createdAt: string
}

export interface Article {
  slug: string
  title: string
  excerpt: string
  content: string[]
  gradientFrom: string
  gradientTo: string
  icon: string
  category: string
  author: string
  publishedAt: string
  readTime: number
}

export interface LeaderboardEntry {
  rank: number
  maskedName: string
  totalSpent: number
  favoriteGame: string
  badge?: 'gold' | 'silver' | 'bronze'
}

export interface User {
  id: string
  fullName: string
  username: string
  email: string
  phone: string
  joinedAt: string
  totalTransactions: number
}
