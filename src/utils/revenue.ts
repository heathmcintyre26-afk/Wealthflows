export interface TransactionLog {
  id: string
  createdAt: Date
  type: 'revenue' | 'expense'
  amount: number
  description: string
}

// Simulated transaction ledger – replace with a real API call when a backend is available
const transactionLog: TransactionLog[] = [
  { id: '1', createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),  type: 'revenue', amount: 49,  description: 'Technical Analysis course purchase' },
  { id: '2', createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),  type: 'revenue', amount: 99,  description: 'DeFi & Smart Contracts course purchase' },
  { id: '3', createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000), type: 'expense', amount: 15,  description: 'Payment processing fee' },
  { id: '4', createdAt: new Date(Date.now() - 14 * 60 * 60 * 1000), type: 'revenue', amount: 59,  description: 'Portfolio Management course purchase' },
  { id: '5', createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000), type: 'expense', amount: 8,   description: 'Payment processing fee' },
  { id: '6', createdAt: new Date(Date.now() - 30 * 60 * 60 * 1000), type: 'revenue', amount: 49,  description: 'Technical Analysis course purchase' },
  { id: '7', createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000), type: 'revenue', amount: 129, description: 'Advanced Trading course purchase' },
]

export const get24hPnL = (): number => {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)

  const recentTransactions = transactionLog.filter(
    (tx) => tx.createdAt >= twentyFourHoursAgo
  )

  return recentTransactions.reduce((acc, tx) => {
    return tx.type === 'revenue' ? acc + tx.amount : acc - tx.amount
  }, 0)
}
