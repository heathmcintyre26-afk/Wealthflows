import { useEffect, useState } from 'react'
import { Wallet, Lock, LogOut, Copy, Check, TrendingUp, TrendingDown, BarChart2 } from 'lucide-react'
import { useWallet } from '../context/wallet'
import { fetchRevenueReport, type ReportPeriod, type RevenueReport } from '../utils/revenueReport'

const WALLET_DATA = {
  balance: 45.25,
  revenue: 12450.50,
  pendingPayouts: 3200.00,
  totalEarnings: 52650.50,
}

const PERIODS: ReportPeriod[] = ['24h', '7d', '30d']

export default function Admin() {
  const [walletInput, setWalletInput] = useState('')
  const [copied, setCopied] = useState(false)
  const { adminWallet, isConnected, connectWallet, disconnectWallet } = useWallet()

  // Revenue report state
  const [period, setPeriod] = useState<ReportPeriod>('24h')
  const [report, setReport] = useState<RevenueReport | null>(null)
  const [reportLoading, setReportLoading] = useState(false)

  useEffect(() => {
    setReportLoading(true)
    fetchRevenueReport(period)
      .then((data) => setReport(data))
      .catch(() => { /* keep previous report on error */ })
      .finally(() => setReportLoading(false))
  }, [period])

  const handleConnect = () => {
    if (connectWallet(walletInput)) {
      setWalletInput('')
    } else {
      alert('Please enter a valid Ethereum wallet address')
    }
  }

  const handleDisconnect = () => {
    disconnectWallet()
    setCopied(false)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    setCopied(false)
  }, [adminWallet])

  return (
    <div className="min-h-screen bg-crypto-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage your admin wallet and earnings</p>
        </div>

        {/* Warning Alert */}
        <div className="glass-effect p-4 border-l-4 border-yellow-500 mb-8 flex items-start space-x-3">
          <Lock size={20} className="text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-yellow-400">Security Notice</p>
            <p className="text-gray-300 text-sm">Only connect a dedicated wallet for revenue collection. Never share your private keys.</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Wallet Connection */}
          <div className="md:col-span-1">
            <div className="glass-effect p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                <Wallet size={24} />
                <span>Admin Wallet</span>
              </h2>

              {!isConnected ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Wallet Address</label>
                    <input
                      type="text"
                      placeholder="0x..."
                      value={walletInput}
                      onChange={(e) => setWalletInput(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-crypto-accent"
                    />
                  </div>
                  <button
                    onClick={handleConnect}
                    className="w-full btn-primary"
                  >
                    Connect Wallet
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    This enables automated revenue distribution
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <p className="text-sm text-green-400 mb-2">✓ Wallet Connected</p>
                    <p className="font-mono text-sm text-white break-all">{adminWallet}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(adminWallet || '')}
                    className="w-full flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 rounded-lg px-4 py-2 transition"
                  >
                    {copied ? (
                      <>
                        <Check size={18} className="text-crypto-success" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={18} />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleDisconnect}
                    className="w-full flex items-center justify-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg px-4 py-2 transition"
                  >
                    <LogOut size={18} />
                    <span>Disconnect</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Revenue Stats */}
          <div className="md:col-span-2 space-y-8">
            {/* Revenue Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-effect p-6">
                <p className="text-gray-400 text-sm mb-2">Total Earnings</p>
                <p className="text-3xl font-bold text-crypto-success">${WALLET_DATA.totalEarnings.toLocaleString()}</p>
              </div>
              <div className="glass-effect p-6">
                <p className="text-gray-400 text-sm mb-2">Course Revenue</p>
                <p className="text-3xl font-bold text-crypto-accent">${WALLET_DATA.revenue.toLocaleString()}</p>
              </div>
              <div className="glass-effect p-6">
                <p className="text-gray-400 text-sm mb-2">Wallet Balance</p>
                <p className="text-3xl font-bold text-yellow-400">{WALLET_DATA.balance} ETH</p>
              </div>
              <div className="glass-effect p-6">
                <p className="text-gray-400 text-sm mb-2">Pending Payouts</p>
                <p className="text-3xl font-bold text-orange-400">${WALLET_DATA.pendingPayouts.toLocaleString()}</p>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="glass-effect p-8">
              <h3 className="text-xl font-bold mb-6">Recent Transactions</h3>
              <div className="space-y-4">
                {[
                  { date: '2024-06-15', course: 'Technical Analysis', amount: 49, status: 'Completed' },
                  { date: '2024-06-14', course: 'DeFi & Smart Contracts', amount: 99, status: 'Completed' },
                  { date: '2024-06-13', course: 'Portfolio Management', amount: 59, status: 'Pending' },
                ].map((tx, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border-b border-white/10 last:border-0">
                    <div>
                      <p className="font-semibold">{tx.course}</p>
                      <p className="text-sm text-gray-400">{tx.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${tx.amount}</p>
                      <p className={`text-sm ${
                        tx.status === 'Completed' ? 'text-crypto-success' : 'text-yellow-400'
                      }`}>
                        {tx.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Withdrawal Options */}
            {isConnected && (
              <div className="glass-effect p-8">
                <h3 className="text-xl font-bold mb-4">Automatic Payouts</h3>
                <p className="text-gray-300 mb-6">All course revenue is automatically distributed to your connected wallet every week.</p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" id="auto-payout" defaultChecked className="w-4 h-4" />
                    <label htmlFor="auto-payout" className="text-gray-300">Enable automatic payouts</label>
                  </div>
                  <button className="w-full btn-primary">
                    Withdraw ${WALLET_DATA.pendingPayouts.toLocaleString()} Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Revenue Report */}
        <div className="mt-12">
          <div className="glass-effect p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <h2 className="text-2xl font-bold flex items-center space-x-2">
                <BarChart2 size={24} />
                <span>Revenue Report</span>
              </h2>
              <div className="flex space-x-2">
                {PERIODS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition ${
                      period === p
                        ? 'gradient-crypto text-white'
                        : 'bg-white/10 hover:bg-white/20 text-gray-300'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {reportLoading || !report ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-crypto-accent" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-effect p-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-gray-400 text-sm">Total Revenue</p>
                    <div className="bg-blue-500/20 p-2 rounded-lg">
                      <TrendingUp size={18} className="text-crypto-accent" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-crypto-accent">
                    ${report.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="glass-effect p-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-gray-400 text-sm">Total Expenses</p>
                    <div className="bg-red-500/20 p-2 rounded-lg">
                      <TrendingDown size={18} className="text-crypto-danger" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-crypto-danger">
                    ${report.totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="glass-effect p-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-gray-400 text-sm">Net Profit</p>
                    <div className="bg-green-500/20 p-2 rounded-lg">
                      <BarChart2 size={18} className="text-crypto-success" />
                    </div>
                  </div>
                  <p className={`text-3xl font-bold ${report.netProfit >= 0 ? 'text-crypto-success' : 'text-crypto-danger'}`}>
                    ${report.netProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
