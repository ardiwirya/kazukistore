import type { LeaderboardEntry } from '@/types'

const names = [
  'Dzikri', 'Tegar', 'Bagas', 'Rujak', 'Prasetyo', 'Muhamad', 'Dhika', 'Diffa',
  'Erwin', 'Zaenal', 'Rizky', 'Andika', 'Rafi', 'Winarto', 'Kevin', 'Farel',
  'Galih', 'Sultan', 'Vino', 'Yoga'
]

const games = ['Legend Arena', 'Battle Royale X', 'Ether Tactics', 'Wildfire Squad', 'Vector Strike', 'Skybound Legends']

const mask = (name: string) => `${name.slice(0, 3)}${'*'.repeat(Math.max(name.length - 3, 6))}`

function buildBoard(seedMultiplier: number): LeaderboardEntry[] {
  return names.slice(0, 10).map((name, index) => ({
    rank: index + 1,
    maskedName: mask(name),
    totalSpent: Math.round(((10 - index) * 1_250_000 * seedMultiplier) / 100) * 100,
    favoriteGame: games[index % games.length],
    badge: index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : undefined
  }))
}

export const leaderboardToday = buildBoard(0.6)
export const leaderboardWeekly = buildBoard(1.4)
export const leaderboardMonthly = buildBoard(3.2)
