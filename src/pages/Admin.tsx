import { useState } from 'react'
import { Wallet, Lock, LogOut, Copy, Check, TrendingUp, DollarSign, Send } from 'lucide-react'
import { Link } from 'react-router-dom'

interface MetaMaskProvider extends any {
  request: (args: { method: string; params?: any[] }) => Promise<any>
}

export default function Admin() {
  const [metamaskWallet, setMetamaskWallet] = useState<string | null>(null)
  const [walletInput, setWalletInput] = useState('')
  const [copied, setCopied] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  // Simulated revenue data
  const revenueData = {
    totalRevenue: 125450.50,
    monthlyRevenue: 45230.75,
    courseRevenue: 89650.30,
    subscriptionRevenue: 35800.20,
    pendingPayouts: 12300.00,
    walletBalance: 2.5,
    conversions: 1240,
    avgOrderValue: 101.17,
  }

  const handleMetaMaskConnect = async () => {
    setIsConnecting(true)
    try {
      // Check if MetaMask is installed
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        const ethereum = (window as any).ethereum as MetaMaskProvider
        
        // Request account access
        const accounts = await ethereum.request({ 
          method: 'eth_requestAccounts' 
        })
        
        if (accounts && accounts.length > 0) {
          setMetamaskWallet(accounts[0])
          setIsConnected(true)
          setWalletInput('')
        }
      } else {
        alert('MetaMask is not installed. Please install it to connect.')
      }
    } catch (error: any) {
      console.error('MetaMask connection error:', error)
      alert('Failed to connect MetaMask: ' + error.message)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleManualConnect = () => {
    if (walletInput.toLowerCase().startsWith('0x') && walletInput.length === 42) {
      setMetamaskWallet(walletInput)
      setIsConnected(true)
      setWalletInput('')
    } else {
      alert('Please enter a valid Ethereum wallet address (0x...)')
    }
  }

  const handleDisconnect = () => {
    setMetamaskWallet(null)
    setIsConnected(false)
    setWalletInput('')
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-crypto-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage your MetaMask wallet and track revenue</p>
        </div>

        {/* Security Alert */}
        <div className="glass-effect p-4 border-l-4 border-yellow-500 mb-8 flex items-start space-x-3">
          <Lock size={20} className="text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-yellow-400">Security Notice</p>
            <p className="text-gray-300 text-sm">Connect only a dedicated MetaMask wallet for revenue collection. Never share your private keys or seed phrase.</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Left Column - MetaMask Connection */}
          <div className="md:col-span-1">
            <div className="glass-effect p-8 h-full">
              <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                <Wallet size={24} />
                <span>MetaMask Wallet</span>
              </h2>

              {!isConnected ? (
                <div className="space-y-4">
                  <button
                    onClick={handleMetaMaskConnect}
                    disabled={isConnecting}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center space-x-2"
                  >
                    <Wallet size={20} />
                    <span>{isConnecting ? 'Connecting...' : 'Connect MetaMask'}</span>
                  </button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-crypto-light text-gray-400">OR</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Manual Wallet Address</label>
                    <input
                      type="text"
                      placeholder="0x..."
                      value={walletInput}
                      onChange={(e) => setWalletInput(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-crypto-accent transition"
                    />
                  </div>
                  <button
                    onClick={handleManualConnect}
                    className="w-full btn-primary text-sm"
                  >
                    Connect Wallet
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    Enables automated revenue distribution to your wallet
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <p className="text-sm text-green-400 mb-2 flex items-center space-x-2">
                      <Check size={16} />
                      <span>MetaMask Connected</span>
                    </p>
                    <p className="font-mono text-xs text-white break-all bg-black/30 p-2 rounded">{metamaskWallet}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(metamaskWallet || '')}
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
                <p className="text-gray-400 text-sm mb-2 flex items-center space-x-2">
                  <TrendingUp size={16} />
                  Total Revenue
                </p>
                <p className="text-3xl font-bold text-crypto-success">${revenueData.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="glass-effect p-6">
                <p className="text-gray-400 text-sm mb-2 flex items-center space-x-2">
                  <DollarSign size={16} />
                  Monthly Revenue
                </p>
                <p className="text-3xl font-bold text-crypto-accent">${revenueData.monthlyRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="glass-effect p-6">
                <p className="text-gray-400 text-sm mb-2">Course Revenue</p>
                <p className="text-3xl font-bold text-blue-400">${revenueData.courseRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="glass-effect p-6">
                <p className="text-gray-400 text-sm mb-2">Subscription Revenue</p>
                <p className="text-3xl font-bold text-purple-400">${revenueData.subscriptionRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-effect p-6">
                <p className="text-gray-400 text-sm mb-2">Wallet Balance</p>
                <p className="text-2xl font-bold text-yellow-400">{revenueData.walletBalance} ETH</p>
              </div>
              <div className="glass-effect p-6">
                <p className="text-gray-400 text-sm mb-2">Pending Payouts</p>
                <p className="text-2xl font-bold text-orange-400">${revenueData.pendingPayouts.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="glass-effect p-6">
                <p className="text-gray-400 text-sm mb-2">Avg. Order Value</p>
                <p className="text-2xl font-bold text-pink-400">${revenueData.avgOrderValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Revenue Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Recent Transactions */}
          <div className="glass-effect p-8">
            <h3 className="text-xl font-bold mb-6">Recent Course Sales</h3>
            <div className="space-y-4">
              {[
                { date: '2024-06-15', course: 'Elite Crypto Trading Bootcamp', amount: 1200, status: 'Completed' },
                { date: '2024-06-14', course: 'Institutional Trading Masterclass', amount: 1500, status: 'Completed' },
                { date: '2024-06-13', course: 'Whale Trading Secrets', amount: 999, status: 'Completed' },
                { date: '2024-06-12', course: 'Advanced Trading Algorithms', amount: 799, status: 'Pending' },
                { date: '2024-06-11', course: 'DeFi & Smart Contracts', amount: 499, status: 'Completed' },
              ].map((tx, i) => (
                <div key={i} className="flex items-center justify-between p-4 border-b border-white/10 last:border-0 hover:bg-white/5 rounded transition">
                  <div>
                    <p className="font-semibold text-sm">{tx.course}</p>
                    <p className="text-xs text-gray-400">{tx.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${tx.amount}</p>
                    <p className={`text-xs ${
                      tx.status === 'Completed' ? 'text-crypto-success' : 'text-yellow-400'
                    }`}>
                      {tx.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payout Management */}
          {isConnected && (
            <div className="glass-effect p-8">
              <h3 className="text-xl font-bold mb-6">Automatic Payouts</h3>
              <p className="text-gray-300 mb-6 text-sm">All course revenue is automatically distributed to your MetaMask wallet every week.</p>
              <div className="space-y-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <p className="text-green-400 text-sm font-semibold mb-2">✓ Auto Payouts Enabled</p>
                  <p className="text-gray-400 text-xs">Revenue distributes every Monday at 00:00 UTC</p>
                </div>
                <button className="w-full btn-primary flex items-center justify-center space-x-2">
                  <Send size={18} />
                  <span>Withdraw ${revenueData.pendingPayouts.toLocaleString('en-US', { minimumFractionDigits: 2 })} Now</span>
                </button>
                <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                  <DollarSign size={18} />
                  <span>Set Payout Schedule</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Info Box */}
        {isConnected && (
          <div className="mt-8 glass-effect p-6 border-l-4 border-crypto-accent">
            <p className="text-gray-300">
              <strong>💡 Tip:</strong> Your revenue data updates in real-time. Monitor your earnings and manage automatic payouts directly from your MetaMask wallet. All transactions are secured on the blockchain.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
