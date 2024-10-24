'use client'
 
import { ReactNode } from 'react'
import { wagmiConfig, projectId } from './wagmi.config'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { State, WagmiProvider } from 'wagmi'
import { vMainnet } from '@/tenderly.config'
 
// Setup queryClient
const queryClient = new QueryClient()
 
if (!projectId) throw new Error('Project ID is not defined')
 
// Create modal
createWeb3Modal({
  wagmiConfig: wagmiConfig,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
  defaultChain: process.env.NEXT_PUBLIC_TENDERLY_VNETS_ENABLED === 'true' ? vMainnet : wagmiConfig.chains[0]
})
 
export default function Web3ModalProvider({ children, initialState }: {
  children: ReactNode
  initialState?: State
}) {
  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <w3m-button />
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}