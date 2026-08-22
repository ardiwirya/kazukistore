import type { Game } from '@/types'

const defaultIdFields = {
  playerServer: [
    { key: 'playerId', label: 'Player ID', placeholder: 'Contoh: 123456789', required: true },
    { key: 'serverId', label: 'Server ID (Zone ID)', placeholder: 'Contoh: 2001', required: true }
  ] as Game['idFields'],
  playerOnly: [
    { key: 'playerId', label: 'Player ID / UID', placeholder: 'Masukkan User ID kamu', required: true }
  ] as Game['idFields'],
  username: [
    { key: 'username', label: 'Username', placeholder: 'Masukkan username akun', required: true }
  ] as Game['idFields']
}

export const games: Game[] = [
  {
    slug: 'legend-arena',
    name: 'Legend Arena',
    publisher: 'Moonshade Studio',
    category: 'moba',
    categoryLabel: 'MOBA',
    icon: '⚔️',
    gradientFrom: '#7c3aed',
    gradientTo: '#3b82f6',
    rating: 4.8,
    reviewCount: 12043,
    soldCount: 218500,
    isPopular: true,
    description:
      'Legend Arena adalah game MOBA 5v5 dengan lebih dari 120 hero unik. Top up Diamond untuk membuka skin eksklusif dan hero terbaru.',
    idFields: defaultIdFields.playerServer,
    helpText: 'Buka profil di dalam game untuk melihat Player ID dan Zone ID kamu, biasanya berada di bawah nama akun.',
    nominals: [
      { id: 'la-1', label: '50 Diamond', amount: 50, currency: 'diamond', price: 12500 },
      { id: 'la-2', label: '150 Diamond', amount: 150, currency: 'diamond', price: 35000, isPopular: true },
      { id: 'la-3', label: '350 Diamond', amount: 350, currency: 'diamond', price: 79000, bonus: '+20 Bonus' },
      { id: 'la-4', label: '700 Diamond', amount: 700, currency: 'diamond', price: 149000, isBestValue: true, bonus: '+50 Bonus' },
      { id: 'la-5', label: '1400 Diamond', amount: 1400, currency: 'diamond', price: 289000, originalPrice: 320000 },
      { id: 'la-6', label: 'Weekly Pass', amount: 1, currency: 'point', price: 29000 },
      { id: 'la-7', label: 'Monthly Pass', amount: 1, currency: 'point', price: 149000 }
    ]
  },
  {
    slug: 'battle-royale-x',
    name: 'Battle Royale X',
    publisher: 'Steelforge Games',
    category: 'battle-royale',
    categoryLabel: 'Battle Royale',
    icon: '🪖',
    gradientFrom: '#f97316',
    gradientTo: '#dc2626',
    rating: 4.6,
    reviewCount: 9820,
    soldCount: 187300,
    isPopular: true,
    isNew: false,
    description: 'Battle Royale X menghadirkan pertempuran 100 pemain dengan grafis realistis. Top up UC untuk crate dan royale pass.',
    idFields: defaultIdFields.playerOnly,
    helpText: 'Player ID / UID bisa ditemukan di halaman profil, tepat di bawah nama karaktermu.',
    nominals: [
      { id: 'brx-1', label: '60 UC', amount: 60, currency: 'uc', price: 15000 },
      { id: 'brx-2', label: '325 UC', amount: 325, currency: 'uc', price: 75000, isPopular: true },
      { id: 'brx-3', label: '660 UC', amount: 660, currency: 'uc', price: 149000, bonus: '+35 Bonus' },
      { id: 'brx-4', label: '1800 UC', amount: 1800, currency: 'uc', price: 379000, isBestValue: true },
      { id: 'brx-5', label: '3850 UC', amount: 3850, currency: 'uc', price: 749000, originalPrice: 799000 },
      { id: 'brx-6', label: 'Elite Royale Pass', amount: 1, currency: 'point', price: 149000 }
    ]
  },
  {
    slug: 'wildfire-squad',
    name: 'Wildfire Squad',
    publisher: 'Emberlight',
    category: 'battle-royale',
    categoryLabel: 'Battle Royale',
    icon: '🔥',
    gradientFrom: '#ef4444',
    gradientTo: '#f59e0b',
    rating: 4.5,
    reviewCount: 7421,
    soldCount: 98230,
    isPopular: true,
    description: 'Game battle royale ringan dengan pertandingan cepat 10 menit. Top up Diamond untuk karakter dan bundle eksklusif.',
    idFields: defaultIdFields.playerOnly,
    helpText: 'Player ID terletak di pojok kiri atas layar utama, tepat di bawah avatar kamu.',
    nominals: [
      { id: 'ws-1', label: '70 Diamond', amount: 70, currency: 'diamond', price: 12000 },
      { id: 'ws-2', label: '360 Diamond', amount: 360, currency: 'diamond', price: 58000, isPopular: true },
      { id: 'ws-3', label: '720 Diamond', amount: 720, currency: 'diamond', price: 115000, bonus: '+40 Bonus' },
      { id: 'ws-4', label: '1450 Diamond', amount: 1450, currency: 'diamond', price: 229000, isBestValue: true },
      { id: 'ws-5', label: 'Member Mingguan', amount: 1, currency: 'point', price: 19000 }
    ]
  },
  {
    slug: 'ether-tactics',
    name: 'Ether Tactics',
    publisher: 'Nightglass Interactive',
    category: 'rpg',
    categoryLabel: 'RPG Strategi',
    icon: '🐉',
    gradientFrom: '#0ea5e9',
    gradientTo: '#7c3aed',
    rating: 4.9,
    reviewCount: 15320,
    soldCount: 267800,
    isPopular: true,
    isNew: true,
    description: 'RPG open world dengan sistem gacha karakter. Top up Genesis Crystal untuk mendapatkan karakter dan senjata rare.',
    idFields: defaultIdFields.playerOnly,
    helpText: 'UID dapat ditemukan di menu Pengaturan > Info Akun di dalam game.',
    nominals: [
      { id: 'et-1', label: '60 Crystal', amount: 60, currency: 'coin', price: 16000 },
      { id: 'et-2', label: '300 + 30 Crystal', amount: 330, currency: 'coin', price: 79000, isPopular: true },
      { id: 'et-3', label: '980 + 110 Crystal', amount: 1090, currency: 'coin', price: 249000, bonus: '+110 Bonus' },
      { id: 'et-4', label: '1980 + 260 Crystal', amount: 2240, currency: 'coin', price: 479000, isBestValue: true },
      { id: 'et-5', label: '3280 + 600 Crystal', amount: 3880, currency: 'coin', price: 749000, originalPrice: 799000 },
      { id: 'et-6', label: 'Blessing of the Moon', amount: 1, currency: 'point', price: 79000 }
    ]
  },
  {
    slug: 'vector-strike',
    name: 'Vector Strike',
    publisher: 'Redline Games',
    category: 'fps',
    categoryLabel: 'FPS Taktis',
    icon: '🎯',
    gradientFrom: '#dc2626',
    gradientTo: '#111827',
    rating: 4.7,
    reviewCount: 6210,
    soldCount: 74100,
    isPopular: false,
    description: 'FPS taktis 5v5 kompetitif. Top up Point untuk skin senjata dan operator eksklusif.',
    idFields: defaultIdFields.username,
    helpText: 'Gunakan username akun yang sama seperti saat login ke Vector Strike.',
    nominals: [
      { id: 'vs-1', label: '500 Point', amount: 500, currency: 'point', price: 25000 },
      { id: 'vs-2', label: '1200 Point', amount: 1200, currency: 'point', price: 55000, isPopular: true },
      { id: 'vs-3', label: '2500 Point', amount: 2500, currency: 'point', price: 109000, isBestValue: true },
      { id: 'vs-4', label: 'Operator Pass', amount: 1, currency: 'point', price: 89000 }
    ]
  },
  {
    slug: 'petit-farm',
    name: 'Petit Farm Story',
    publisher: 'Cloudberry',
    category: 'casual',
    categoryLabel: 'Casual',
    icon: '🌾',
    gradientFrom: '#22c55e',
    gradientTo: '#a3e635',
    rating: 4.4,
    reviewCount: 3980,
    soldCount: 41200,
    isPopular: false,
    isNew: true,
    description: 'Game simulasi pertanian santai. Top up Gem untuk mempercepat panen dan membeli dekorasi lucu.',
    idFields: defaultIdFields.playerOnly,
    helpText: 'Player ID tersedia di halaman profil desa, tepat di samping nama petani kamu.',
    nominals: [
      { id: 'pf-1', label: '100 Gem', amount: 100, currency: 'coin', price: 10000 },
      { id: 'pf-2', label: '520 Gem', amount: 520, currency: 'coin', price: 49000, isPopular: true },
      { id: 'pf-3', label: '1080 Gem', amount: 1080, currency: 'coin', price: 95000, isBestValue: true },
      { id: 'pf-4', label: 'Musim Emas Pass', amount: 1, currency: 'point', price: 39000 }
    ]
  },
  {
    slug: 'chrono-blade',
    name: 'Chrono Blade Online',
    publisher: 'Aetherium',
    category: 'rpg',
    categoryLabel: 'MMORPG',
    icon: '🗡️',
    gradientFrom: '#8b5cf6',
    gradientTo: '#ec4899',
    rating: 4.6,
    reviewCount: 5410,
    soldCount: 63200,
    isPopular: false,
    description: 'MMORPG fantasi dengan dunia luas untuk dijelajahi. Top up Coin untuk upgrade equipment legendaris.',
    idFields: defaultIdFields.playerServer,
    helpText: 'Cek Player ID dan Server pada halaman pemilihan karakter sebelum masuk ke dunia game.',
    nominals: [
      { id: 'cb-1', label: '100 Coin', amount: 100, currency: 'coin', price: 15000 },
      { id: 'cb-2', label: '520 Coin', amount: 520, currency: 'coin', price: 75000, isPopular: true },
      { id: 'cb-3', label: '1080 Coin', amount: 1080, currency: 'coin', price: 149000, isBestValue: true },
      { id: 'cb-4', label: 'VIP Bulanan', amount: 1, currency: 'point', price: 59000 }
    ]
  },
  {
    slug: 'skybound-legends',
    name: 'Skybound Legends',
    publisher: 'Horizon Foundry',
    category: 'moba',
    categoryLabel: 'MOBA',
    icon: '🛡️',
    gradientFrom: '#3b82f6',
    gradientTo: '#06b6d4',
    rating: 4.5,
    reviewCount: 4210,
    soldCount: 38900,
    isPopular: false,
    description: 'MOBA 3v3 cepat dan seru untuk mobile. Top up Gem untuk hero dan skin edisi terbatas.',
    idFields: defaultIdFields.playerServer,
    helpText: 'Player ID dan Server ID muncul saat kamu membuka menu profil di lobi utama.',
    nominals: [
      { id: 'sl-1', label: '86 Gem', amount: 86, currency: 'diamond', price: 15000 },
      { id: 'sl-2', label: '172 Gem', amount: 172, currency: 'diamond', price: 29000, isPopular: true },
      { id: 'sl-3', label: '430 Gem', amount: 430, currency: 'diamond', price: 69000, isBestValue: true },
      { id: 'sl-4', label: '878 Gem', amount: 878, currency: 'diamond', price: 139000 }
    ]
  },
  {
    slug: 'gplay-voucher',
    name: 'Google Play Voucher',
    publisher: 'Google',
    category: 'voucher',
    categoryLabel: 'Voucher',
    icon: '🎟️',
    gradientFrom: '#22d3ee',
    gradientTo: '#3b82f6',
    rating: 4.9,
    reviewCount: 21032,
    soldCount: 302100,
    isPopular: true,
    description: 'Voucher Google Play resmi untuk top up saldo, beli aplikasi, atau redeem kode di berbagai game favoritmu.',
    idFields: [{ key: 'username', label: 'Alamat Email Akun Google', placeholder: 'nama@email.com', required: true }],
    helpText: 'Kode voucher akan dikirim otomatis ke halaman invoice setelah pembayaran berhasil.',
    nominals: [
      { id: 'gpv-1', label: 'Rp 20.000', amount: 20000, currency: 'idr', price: 20500 },
      { id: 'gpv-2', label: 'Rp 50.000', amount: 50000, currency: 'idr', price: 50500, isPopular: true },
      { id: 'gpv-3', label: 'Rp 100.000', amount: 100000, currency: 'idr', price: 100500, isBestValue: true },
      { id: 'gpv-4', label: 'Rp 300.000', amount: 300000, currency: 'idr', price: 300500 }
    ]
  },
  {
    slug: 'stream-plus',
    name: 'StreamPlus Premium',
    publisher: 'StreamPlus',
    category: 'entertainment',
    categoryLabel: 'Hiburan',
    icon: '🎬',
    gradientFrom: '#f43f5e',
    gradientTo: '#7c3aed',
    rating: 4.7,
    reviewCount: 8890,
    soldCount: 121400,
    isPopular: false,
    description: 'Nikmati ribuan film dan series tanpa iklan. Top up untuk perpanjangan langganan StreamPlus Premium.',
    idFields: [{ key: 'username', label: 'Email Akun StreamPlus', placeholder: 'nama@email.com', required: true }],
    helpText: 'Pastikan email yang dimasukkan sesuai dengan akun StreamPlus aktif kamu.',
    nominals: [
      { id: 'sp-1', label: '1 Bulan', amount: 1, currency: 'point', price: 54000 },
      { id: 'sp-2', label: '3 Bulan', amount: 3, currency: 'point', price: 149000, isPopular: true },
      { id: 'sp-3', label: '12 Bulan', amount: 12, currency: 'point', price: 499000, isBestValue: true, originalPrice: 648000 }
    ]
  },
  {
    slug: 'pulsa-allop',
    name: 'Pulsa All Operator',
    publisher: 'KazukiStore',
    category: 'voucher',
    categoryLabel: 'Pulsa & Data',
    icon: '📱',
    gradientFrom: '#a855f7',
    gradientTo: '#22d3ee',
    rating: 4.8,
    reviewCount: 17650,
    soldCount: 256700,
    isPopular: true,
    description: 'Isi pulsa dan paket data untuk semua operator di Indonesia dengan proses instan 24 jam.',
    idFields: [{ key: 'username', label: 'Nomor HP', placeholder: '08xxxxxxxxxx', required: true }],
    helpText: 'Masukkan nomor HP aktif tanpa spasi atau tanda baca, contoh: 081234567890.',
    nominals: [
      { id: 'pa-1', label: 'Pulsa 10.000', amount: 10000, currency: 'idr', price: 11500 },
      { id: 'pa-2', label: 'Pulsa 25.000', amount: 25000, currency: 'idr', price: 26500, isPopular: true },
      { id: 'pa-3', label: 'Pulsa 50.000', amount: 50000, currency: 'idr', price: 51000, isBestValue: true },
      { id: 'pa-4', label: 'Pulsa 100.000', amount: 100000, currency: 'idr', price: 100500 }
    ]
  },
  {
    slug: 'clan-wars-online',
    name: 'Clan Wars Online',
    publisher: 'Ironpeak',
    category: 'moba',
    categoryLabel: 'Strategi',
    icon: '🏰',
    gradientFrom: '#f59e0b',
    gradientTo: '#7c2d12',
    rating: 4.3,
    reviewCount: 2980,
    soldCount: 28700,
    isPopular: false,
    description: 'Bangun markas, latih pasukan, dan taklukkan clan lain. Top up Gems untuk mempercepat pembangunan.',
    idFields: defaultIdFields.playerOnly,
    helpText: 'Player ID tersedia di pojok kanan atas layar markas utama.',
    nominals: [
      { id: 'cw-1', label: '80 Gems', amount: 80, currency: 'coin', price: 15000 },
      { id: 'cw-2', label: '500 Gems', amount: 500, currency: 'coin', price: 85000, isPopular: true },
      { id: 'cw-3', label: '1200 Gems', amount: 1200, currency: 'coin', price: 189000, isBestValue: true }
    ]
  }
]

export const getGameBySlug = (slug: string): Game | undefined => games.find((game) => game.slug === slug)

export const popularGames = games.filter((g) => g.isPopular)

export const categories: { value: string; label: string }[] = [
  { value: 'all', label: 'Semua' },
  { value: 'moba', label: 'MOBA' },
  { value: 'battle-royale', label: 'Battle Royale' },
  { value: 'rpg', label: 'RPG' },
  { value: 'fps', label: 'FPS' },
  { value: 'casual', label: 'Casual' },
  { value: 'voucher', label: 'Voucher' },
  { value: 'entertainment', label: 'Hiburan' }
]
