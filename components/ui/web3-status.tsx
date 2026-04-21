import * as React from "react"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription } from "./alert"
import { Spinner } from "./spinner"

interface Web3StatusProps extends React.HTMLAttributes<HTMLDivElement> {
  status: 'connecting' | 'connected' | 'disconnected' | 'error'
  address?: string
  chainId?: number
  error?: string
}

const Web3Status = React.forwardRef<HTMLDivElement, Web3StatusProps>(
  ({ className, status, address, chainId, error, ...props }, ref) => {
    const formatAddress = (addr: string) => {
      return `${addr.slice(0, 6)}...${addr.slice(-4)}`
    }

    const getChainName = (id: number) => {
      const chains: Record<number, string> = {
        1: 'Ethereum',
        31337: 'Hardhat',
        5: 'Goerli',
        11155111: 'Sepolia',
        137: 'Polygon',
        80001: 'Mumbai',
      }
      return chains[id] || `Chain ${id}`
    }

    if (status === 'connecting') {
      return (
        <div ref={ref} className={cn("w-full", className)} {...props}>
          <Alert variant="info">
            <div className="flex items-center space-x-2">
              <Spinner size="sm" />
              <AlertDescription>
                Connecting to wallet...
              </AlertDescription>
            </div>
          </Alert>
        </div>
      )
    }

    if (status === 'connected' && address) {
      return (
        <div ref={ref} className={cn("w-full", className)} {...props}>
          <Alert variant="success">
            <AlertDescription>
              <div className="flex flex-col space-y-1">
                <span className="font-medium">Connected to {getChainName(chainId || 1)}</span>
                <span className="text-sm opacity-90">{formatAddress(address)}</span>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      )
    }

    if (status === 'error') {
      return (
        <div ref={ref} className={cn("w-full", className)} {...props}>
          <Alert variant="destructive">
            <AlertDescription>
              {error || 'Connection failed. Please try again.'}
            </AlertDescription>
          </Alert>
        </div>
      )
    }

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <Alert variant="warning">
          <AlertDescription>
            Wallet not connected. Please connect your wallet to continue.
          </AlertDescription>
        </Alert>
      </div>
    )
  }
)
Web3Status.displayName = "Web3Status"

export { Web3Status }
