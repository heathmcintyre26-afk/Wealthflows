import { createContext, useContext, useState, ReactNode } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  walletAddress: string | null
  login: (address: string) => void
  logout: () => void
}

const SESSION_KEY = 'wf_wallet'
const ETH_ADDRESS_RE = /^0x[0-9a-fA-F]{40}$/

const AuthContext = createContext<AuthContextType | null>(null)

function readPersistedWallet() {
  if (typeof window === 'undefined') return null
  try {
    const stored = window.sessionStorage.getItem(SESSION_KEY)
    if (stored && !ETH_ADDRESS_RE.test(stored)) {
      window.sessionStorage.removeItem(SESSION_KEY)
      return null
    }
    return stored
  } catch {
    return null
  }
}

function persistWallet(address: string) {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.setItem(SESSION_KEY, address)
  } catch {
    // Ignore sessionStorage write failures
  }
}

function clearPersistedWallet() {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.removeItem(SESSION_KEY)
  } catch {
    // Ignore sessionStorage removal failures
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [walletAddress, setWalletAddress] = useState<string | null>(
    () => readPersistedWallet()
  )

  const isAuthenticated = walletAddress !== null

  const login = (address: string) => {
    const normalizedAddress = address.trim()
    if (!ETH_ADDRESS_RE.test(normalizedAddress)) return
    persistWallet(normalizedAddress)
    setWalletAddress(normalizedAddress)
  }

  const logout = () => {
    clearPersistedWallet()
    setWalletAddress(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, walletAddress, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
