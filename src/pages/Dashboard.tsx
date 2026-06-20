import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react'

interface CryptoData {
  id: string
  name: string
  symbol: string
  price: number
  change24h: number
  marketCap: number
}

export default function Dashboard() {
  const [cryptos, setCryptos] = useState<CryptoData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCryptoData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Sample data - replace with real API calls
      // Example: const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
      // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      // const data = await response.json()
      
      const sampleData: CryptoData[] = [
        { id: '1', name: 'Bitcoin', symbol: 'BTC', price: 42500, change24h: 2.5, marketCap: 850000000000 },
        { id: '2', name: 'Ethereum', symbol: 'ETH', price: 2250, change24h: -1.2, marketCap: 270000000000 },
        { id: '3', name: 'Cardano', symbol: 'ADA', price: 0.75, change24h: 3.8, marketCap: 27000000000 },
        { id: '4', name: 'Solana', symbol: 'SOL', price: 145, change24h: 5.2, marketCap: 62000000000 },
      ]
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setCryptos(sampleData)
    } catch (err) {
      console.error('Failed to fetch crypto data:', err)
      setError(err instanceof Error ? err.message : 'Failed to load market data. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  // Fetch crypto data with proper error handling
  useEffect(() => {
    fetchCryptoData()
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
            <div className="p-12 text-center">
              <div className="glass-effect inline-block p-6 rounded-lg border-l-4 border-crypto-danger">
                <p className="text-crypto-danger font-semibold mb-2">⚠️ Error Loading Data</p>
                <p className="text-gray-300 mb-4">{error}</p>
                <button 
                  onClick={fetchCryptoData}
                  className="btn-primary"
                >
                  Try Again
                </button>
              </div>
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
      </div>
    </div>
  )
}
