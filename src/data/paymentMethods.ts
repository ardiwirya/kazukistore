import type { PaymentMethod } from '@/types'

export const paymentMethods: PaymentMethod[] = [
  { id: 'qris', name: 'QRIS (Semua e-wallet & bank)', group: 'qris', fee: 0.7, feeType: 'percent', icon: '🔳', isPopular: true },
  { id: 'ovo', name: 'OVO', group: 'e-wallet', fee: 1500, feeType: 'flat', icon: '🟣', isPopular: true },
  { id: 'gopay', name: 'GoPay', group: 'e-wallet', fee: 1500, feeType: 'flat', icon: '🟢', isPopular: true },
  { id: 'dana', name: 'DANA', group: 'e-wallet', fee: 1500, feeType: 'flat', icon: '🔵' },
  { id: 'shopeepay', name: 'ShopeePay', group: 'e-wallet', fee: 1500, feeType: 'flat', icon: '🟠' },
  { id: 'bca-va', name: 'BCA Virtual Account', group: 'virtual-account', fee: 4000, feeType: 'flat', icon: '🏦', isPopular: true },
  { id: 'bni-va', name: 'BNI Virtual Account', group: 'virtual-account', fee: 4000, feeType: 'flat', icon: '🏦' },
  { id: 'bri-va', name: 'BRI Virtual Account', group: 'virtual-account', fee: 4000, feeType: 'flat', icon: '🏦' },
  { id: 'permata-va', name: 'Permata Virtual Account', group: 'virtual-account', fee: 4000, feeType: 'flat', icon: '🏦' },
  { id: 'alfamart', name: 'Alfamart', group: 'retail', fee: 2500, feeType: 'flat', icon: '🏪' },
  { id: 'indomaret', name: 'Indomaret', group: 'retail', fee: 2500, feeType: 'flat', icon: '🏪' }
]

export const paymentGroupLabels: Record<PaymentMethod['group'], string> = {
  qris: 'QRIS',
  'e-wallet': 'E-Wallet',
  'virtual-account': 'Virtual Account',
  retail: 'Retail / Convenience Store'
}
