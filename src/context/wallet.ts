import { createContext, useContext } from 'react'

export interface WalletContextValue {
  adminWallet: string | null
  isConnected: boolean
  connectWallet: (walletAddress: string) => boolean
  disconnectWallet: () => void
}

export const WalletContext = createContext<WalletContextValue | undefined>(undefined)

export function useWallet() {
  const context = useContext(WalletContext)

  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider')
  }

  return context
}
