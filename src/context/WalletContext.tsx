import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

interface WalletContextValue {
  adminWallet: string | null
  isConnected: boolean
  connectWallet: (walletAddress: string) => boolean
  disconnectWallet: () => void
}

const WalletContext = createContext<WalletContextValue | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [adminWallet, setAdminWallet] = useState<string | null>(null)

  const value = useMemo<WalletContextValue>(() => ({
    adminWallet,
    isConnected: adminWallet !== null,
    connectWallet: (walletAddress: string) => {
      if (!walletAddress.toLowerCase().startsWith('0x')) {
        return false
      }

      setAdminWallet(walletAddress)
      return true
    },
    disconnectWallet: () => {
      setAdminWallet(null)
    },
  }), [adminWallet])

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)

  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider')
  }

  return context
}
