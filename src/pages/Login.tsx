import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Wallet } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const ETH_ADDRESS_RE = /^0x[0-9a-fA-F]{40}$/

export default function Login() {
  const { isAuthenticated, login } = useAuth()
  const [walletInput, setWalletInput] = useState('')
  const [error, setError] = useState<string | null>(null)

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const handleConnect = () => {
    if (!ETH_ADDRESS_RE.test(walletInput)) {
      setError('Please enter a valid Ethereum wallet address (0x followed by 40 hex characters)')
      return
    }
    setError(null)
    login()
  }

  return (
    <div className="min-h-screen bg-crypto-dark flex items-center justify-center">
      <div className="glass-effect p-10 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="gradient-crypto p-4 rounded-xl mb-4">
            <Wallet className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold">Connect Wallet</h1>
          <p className="text-gray-400 mt-2 text-center">
            Connect your wallet to access your dashboard and admin features.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Wallet Address</label>
            <input
              type="text"
              placeholder="0x..."
              value={walletInput}
              onChange={(e) => {
                setWalletInput(e.target.value)
                setError(null)
              }}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-crypto-accent"
            />
          </div>

          {error && (
            <p className="text-sm text-crypto-danger">{error}</p>
          )}

          <button
            onClick={handleConnect}
            className="w-full btn-primary"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  )
}
