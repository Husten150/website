// Web3 TypeScript Types for dApp Starter
import { ReactNode } from 'react'

export interface WalletInfo {
  address: string
  chainId: number
  balance?: string
  isConnected: boolean
}

export interface ChainConfig {
  chainId: number
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls: string[]
  blockExplorerUrls?: string[]
}

export interface AdSlot {
  id: string
  publisher: string
  size: 'banner' | 'square' | 'sidebar' | 'leaderboard' | 'mobile' | 'card'
  price: string
  durations: string[]
  category: string
  isActive: boolean
  currentAd?: AdContent
  queue?: AdQueue[]
}

export interface AdContent {
  id: string
  advertiser: string
  slotId: string
  content: string
  imageUrl?: string
  linkUrl?: string
  duration: number
  startTime: number
  endTime: number
  isActive: boolean
  impressions: number
  clicks: number
}

export interface AdQueue {
  id: string
  advertiser: string
  slotId: string
  content: string
  bidPrice: string
  duration: string
  position: number
  timestamp: number
  status: 'pending' | 'active' | 'completed' | 'expired'
}

export interface TransactionStatus {
  hash: string
  status: 'pending' | 'confirmed' | 'failed' | 'reverted'
  blockNumber?: number
  gasUsed?: string
  gasPrice?: string
  timestamp?: number
}

export interface Web3Error {
  code: number | string
  message: string
  stack?: string
  data?: any
}

export interface ContractConfig {
  address: string
  abi: any[]
  chainId: number
}

export interface DAppConfig {
  contract: ContractConfig
  chains: ChainConfig[]
  alchemyApiKey?: string
  rainbowKitProjectId?: string
}

export interface AnalyticsData {
  slotId: string
  sessionId: string
  timestamp: number
  eventType: 'view' | 'click' | 'impression' | 'conversion'
  data?: Record<string, any>
}

export interface UserSession {
  id: string
  wallet?: string
  startTime: number
  lastActivity: number
  pagesViewed: string[]
  interactions: AnalyticsData[]
}

export interface PaymentInfo {
  amount: string
  currency: string
  recipient: string
  transactionHash?: string
  status: 'pending' | 'completed' | 'failed'
  timestamp: number
}

// Component Props Types
export interface BaseComponentProps {
  className?: string
  children?: ReactNode
}

export interface LoadingProps extends BaseComponentProps {
  isLoading?: boolean
  text?: string
}

export interface ErrorProps extends BaseComponentProps {
  error?: Error | string
  onRetry?: () => void
}

export interface StatusProps extends BaseComponentProps {
  status: 'idle' | 'loading' | 'success' | 'error'
  message?: string
}

// Hook Return Types
export interface UseWalletReturn {
  wallet: WalletInfo | null
  isConnected: boolean
  isConnecting: boolean
  error: Web3Error | null
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  switchChain: (chainId: number) => Promise<void>
}

export interface UseAdSlotReturn {
  slot: AdSlot | null
  isLoading: boolean
  error: Web3Error | null
  bookAd: (params: BookAdParams) => Promise<TransactionStatus>
  getQueue: () => Promise<AdQueue[]>
}

export interface BookAdParams {
  slotId: string
  content: string
  duration: string
  imageUrl?: string
  linkUrl?: string
}

// Event Types
export interface Web3Event {
  type: 'wallet_connected' | 'wallet_disconnected' | 'chain_changed' | 'account_changed'
  payload: any
}

export interface AdEvent {
  type: 'ad_booked' | 'ad_started' | 'ad_ended' | 'ad_clicked' | 'ad_viewed'
  payload: {
    slotId: string
    adId?: string
    timestamp: number
    data?: any
  }
}
