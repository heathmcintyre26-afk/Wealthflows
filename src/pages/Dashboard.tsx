import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, DollarSign, Target, Bug } from 'lucide-react'
import { useWallet } from '../context/wallet'

interface CryptoData {
  id: string
  name: string
  symbol: string
  price: number
  change24h: number
  marketCap: number
}

export default function Dashboard() {
  const { adminWallet, isConnected } = useWallet()
  const [cryptos, setCryptos] = useState<CryptoData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Sample data - replace with real API calls
  useEffect(() => {
    setTimeout(() => {
      try {
        const sampleData: CryptoData[] = [
          { id: '1', name: 'Bitcoin', symbol: 'BTC', price: 42500, change24h: 2.5, marketCap: 850000000000 },
          { id: '2', name: 'Ethereum', symbol: 'ETH', price: 2250, change24h: -1.2, marketCap: 270000000000 },
          { id: '3', name: 'Cardano', symbol: 'ADA', price: 0.75, change24h: 3.8, marketCap: 27000000000 },
          { id: '4', name: 'Solana', symbol: 'SOL', price: 145, change24h: 5.2, marketCap: 62000000000 },
        ]
        setCryptos(sampleData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred')
      } finally {
        setLoading(false)
      }
    }, 500)
  }, [])

  const portfolioValue = 15250.00
  const portfolioChange = 1250.50
  const portfolioChangePercent = 8.9

  return (
    <div className="min-h-screen bg-crypto-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Portfolio Dashboard</h1>
          <p className="text-gray-400">Monitor your crypto investments in real-time</p>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="glass-effect p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-2">Portfolio Value</p>
                <p className="text-3xl font-bold">${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="gradient-crypto p-3 rounded-lg">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="glass-effect p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-2">24h Change</p>
                <p className={`text-3xl font-bold ${portfolioChange >= 0 ? 'text-crypto-success' : 'text-crypto-danger'}`}>
                  ${portfolioChange.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${portfolioChange >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                {portfolioChange >= 0 ? <TrendingUp className="w-6 h-6 text-crypto-success" /> : <TrendingDown className="w-6 h-6 text-crypto-danger" />}
              </div>
            </div>
          </div>

          <div className="glass-effect p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-2">Change %</p>
                <p className={`text-3xl font-bold ${portfolioChangePercent >= 0 ? 'text-crypto-success' : 'text-crypto-danger'}`}>
                  {portfolioChangePercent >= 0 ? '+' : ''}{portfolioChangePercent}%
                </p>
              </div>
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <Target className="w-6 h-6 text-crypto-accent" />
              </div>
            </div>
          </div>

          <div className="glass-effect p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-2">Assets</p>
                <p className="text-3xl font-bold">{cryptos.length}</p>
              </div>
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Crypto Holdings Table */}
        <div className="glass-effect overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="text-xl font-bold">Your Holdings</h2>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-crypto-accent"></div>
              <p className="mt-4 text-gray-400">Loading market data...</p>
            </div>
          ) : error ? (
            <div className="p-12 text-center text-crypto-danger">
              <p>Error loading data: {error}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-400 font-semibold">Coin</th>
                    <th className="px-6 py-4 text-left text-gray-400 font-semibold">Price</th>
                    <th className="px-6 py-4 text-left text-gray-400 font-semibold">24h Change</th>
                    <th className="px-6 py-4 text-left text-gray-400 font-semibold">Market Cap</th>
                    <th className="px-6 py-4 text-left text-gray-400 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cryptos.map((crypto) => (
                    <tr key={crypto.id} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold">{crypto.name}</p>
                          <p className="text-gray-400 text-sm">{crypto.symbol}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold">
                        ${crypto.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-semibold ${
                          crypto.change24h >= 0 
                            ? 'bg-green-500/20 text-crypto-success' 
                            : 'bg-red-500/20 text-crypto-danger'
                        }`}>
                          {crypto.change24h >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                          <span>{crypto.change24h >= 0 ? '+' : ''}{crypto.change24h}%</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        ${(crypto.marketCap / 1000000000).toFixed(0)}B
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-crypto-accent hover:text-blue-400 font-semibold transition">
                          Trade
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-8 glass-effect p-6 border-l-4 border-crypto-accent">
          <p className="text-gray-300">
            💡 <strong>Pro Tip:</strong> Keep an eye on market trends and set alerts for your target prices. Wealthflows will notify you when buying opportunities align with your investment strategy.
          </p>
        </div>

        {/* My Data Debug Overview */}
        <div className="mt-8 glass-effect p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
            <Bug size={20} className="text-purple-400" />
            <span>My Data Overview</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Wallet Info */}
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-3">Wallet</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className={isConnected ? 'text-crypto-success' : 'text-crypto-danger'}>
                    {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Address</span>
                  <span className="font-mono text-xs">
                    {adminWallet ? `${adminWallet.slice(0, 10)}...${adminWallet.slice(-4)}` : '—'}
                  </span>
                </div>
              </div>
            </div>

            {/* Portfolio Snapshot */}
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-3">Portfolio Snapshot</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Value</span>
                  <span>${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">24h P&L</span>
                  <span className={portfolioChange >= 0 ? 'text-crypto-success' : 'text-crypto-danger'}>
                    {portfolioChange >= 0 ? '+' : ''}${portfolioChange.toLocaleString('en-US', { minimumFractionDigits: 2 })} ({portfolioChangePercent}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Assets Tracked</span>
                  <span>{cryptos.length}</span>
                </div>
              </div>
            </div>

            {/* Holdings Debug */}
            <div className="bg-white/5 rounded-lg p-4 md:col-span-2">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-3">Holdings Debug</p>
              {loading ? (
                <p className="text-gray-500 text-sm">Loading…</p>
              ) : error ? (
                <p className="text-crypto-danger text-sm">{error}</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs font-mono">
                    <thead>
                      <tr className="text-gray-400 border-b border-white/10">
                        <th className="text-left py-2 pr-4">id</th>
                        <th className="text-left py-2 pr-4">symbol</th>
                        <th className="text-right py-2 pr-4">price</th>
                        <th className="text-right py-2 pr-4">change24h</th>
                        <th className="text-right py-2">marketCap</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cryptos.map((c) => (
                        <tr key={c.id} className="border-b border-white/5">
                          <td className="py-1 pr-4 text-gray-400">{c.id}</td>
                          <td className="py-1 pr-4">{c.symbol}</td>
                          <td className="py-1 pr-4 text-right">{c.price}</td>
                          <td className={`py-1 pr-4 text-right ${c.change24h >= 0 ? 'text-crypto-success' : 'text-crypto-danger'}`}>
                            {c.change24h >= 0 ? '+' : ''}{c.change24h}%
                          </td>
                          <td className="py-1 text-right text-gray-400">{c.marketCap.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
