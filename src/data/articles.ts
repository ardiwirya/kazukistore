import type { Article } from '@/types'

export const articles: Article[] = [
  {
    slug: 'tips-hemat-top-up-diamond',
    title: '7 Tips Hemat Top Up Diamond Tanpa Bikin Kantong Bolong',
    excerpt:
      'Ingin top up diamond tapi budget terbatas? Simak strategi cerdas berikut supaya top up-mu tetap maksimal dan hemat.',
    content: [
      'Top up diamond memang jadi kebutuhan wajib bagi banyak pemain mobile game kompetitif. Namun bukan berarti kamu harus menghabiskan seluruh uang jajan hanya untuk mengejar item terbaru.',
      'Pertama, manfaatkan promo bundling yang biasanya memberikan bonus diamond ekstra dibandingkan pembelian satuan. Kedua, tetapkan budget bulanan khusus untuk hiburan digital agar pengeluaran tetap terkontrol.',
      'Selain itu, perhatikan jadwal event musiman karena banyak publisher memberikan diskon nominal besar menjelang akhir bulan. Terakhir, gunakan platform top up yang transparan soal harga dan tanpa biaya tersembunyi.',
      'Dengan kombinasi strategi di atas, kamu tetap bisa menikmati konten premium favorit tanpa mengorbankan kebutuhan lain.'
    ],
    gradientFrom: '#7c3aed',
    gradientTo: '#22d3ee',
    icon: '💎',
    category: 'Tips & Trik',
    author: 'Tim Redaksi KazukiStore',
    publishedAt: '2026-08-10',
    readTime: 4
  },
  {
    slug: 'jadwal-turnamen-esports-agustus',
    title: 'Jadwal Turnamen Esports Regional Bulan Ini, Jangan Sampai Ketinggalan',
    excerpt:
      'Musim kompetisi esports regional sedang panas-panasnya. Berikut rangkuman jadwal pertandingan yang wajib kamu tonton.',
    content: [
      'Bulan ini menjadi momen penting bagi para penggemar esports tanah air. Beberapa turnamen besar akan mempertemukan tim-tim terbaik dari berbagai region untuk memperebutkan gelar juara musim ini.',
      'Selain pertandingan utama, akan ada juga babak kualifikasi terbuka yang memberi kesempatan tim amatir untuk unjuk gigi di panggung yang lebih besar.',
      'Pantau terus jadwal resmi dari masing-masing publisher game karena beberapa pertandingan berpotensi mengalami perubahan waktu tayang menyesuaikan kondisi venue.'
    ],
    gradientFrom: '#f97316',
    gradientTo: '#dc2626',
    icon: '🏆',
    category: 'Esports',
    author: 'Tim Redaksi KazukiStore',
    publishedAt: '2026-08-14',
    readTime: 5
  },
  {
    slug: 'cara-main-di-pc-emulator',
    title: 'Cara Main Game Mobile di PC dengan Emulator Agar Lebih Lancar',
    excerpt:
      'Pengalaman bermain di layar besar terasa lebih nyaman. Ini panduan singkat memainkan game mobile favoritmu lewat PC.',
    content: [
      'Bermain game mobile di PC memberikan keuntungan berupa kontrol yang lebih presisi menggunakan keyboard dan mouse, serta tampilan layar yang jauh lebih luas.',
      'Pastikan spesifikasi PC atau laptop kamu memenuhi kebutuhan minimum emulator, terutama pada RAM dan kartu grafis, agar performa game tetap stabil.',
      'Setelah emulator terpasang, sinkronkan akun game seperti biasa lalu sesuaikan pengaturan grafis mengikuti kemampuan perangkat agar pengalaman bermain tetap optimal.'
    ],
    gradientFrom: '#22c55e',
    gradientTo: '#0ea5e9',
    icon: '🖥️',
    category: 'Panduan',
    author: 'Tim Redaksi KazukiStore',
    publishedAt: '2026-08-16',
    readTime: 3
  },
  {
    slug: 'update-terbaru-ether-tactics',
    title: 'Ether Tactics Rilis Update Besar, Hadirkan Karakter dan Map Baru',
    excerpt:
      'Update terbaru Ether Tactics membawa banyak perubahan menarik, mulai dari karakter baru hingga sistem gacha yang direvisi.',
    content: [
      'Pengembang Ether Tactics resmi merilis update musiman yang membawa karakter baru bertema elemen petir lengkap dengan cerita latar yang memperkaya semesta game.',
      'Selain karakter, update ini juga menghadirkan map eksplorasi baru dengan berbagai teka-teki dan misi harian yang memberikan hadiah materi upgrade eksklusif.',
      'Pemain lama maupun baru disarankan untuk memanfaatkan event login harian yang menyediakan bonus Genesis Crystal dalam jumlah besar selama periode update berlangsung.'
    ],
    gradientFrom: '#8b5cf6',
    gradientTo: '#ec4899',
    icon: '🌟',
    category: 'Update Game',
    author: 'Tim Redaksi KazukiStore',
    publishedAt: '2026-08-17',
    readTime: 4
  }
]

export const getArticleBySlug = (slug: string): Article | undefined => articles.find((a) => a.slug === slug)
