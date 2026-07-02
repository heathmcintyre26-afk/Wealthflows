import { createContext, useContext, useState, ReactNode } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  walletAddress: string | null
  login: (address: string) => void
  logout: () => void
}

const SESSION_KEY = 'wf_wallet'

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [walletAddress, setWalletAddress] = useState<string | null>(
    () => sessionStorage.getItem(SESSION_KEY)
  )

  const isAuthenticated = walletAddress !== null

  const login = (address: string) => {
    sessionStorage.setItem(SESSION_KEY, address)
    setWalletAddress(address)
  }

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY)
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
