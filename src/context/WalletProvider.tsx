import { useMemo, useState, type ReactNode } from 'react'
import { WalletContext, type WalletContextValue } from './wallet'

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
