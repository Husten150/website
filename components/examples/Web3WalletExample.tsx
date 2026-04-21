'use client';

import { useWeb3 } from '@/hooks/useWeb3';
import { Web3Status } from '@/components/ui/web3-status';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer } from '@/components/ui/responsive-container';
import { LoadingOverlay } from '@/components/ui/loading-overlay';
import ErrorBoundary from '@/components/ErrorBoundary';

export const Web3WalletExample = () => {
  const {
    wallet,
    isConnected,
    isConnecting,
    error,
    connectors,
    connectWallet,
    disconnectWallet,
    switchChainNetwork,
    clearError
  } = useWeb3({
    autoConnect: true,
    onError: (error) => {
      console.error('Web3 error:', error);
    },
    onSuccess: (wallet) => {
      console.log('Wallet connected:', wallet);
    }
  });

  const handleConnect = async (connectorId: string) => {
    await connectWallet(connectorId);
  };

  const handleDisconnect = async () => {
    await disconnectWallet();
  };

  const handleSwitchChain = async (chainId: number) => {
    await switchChainNetwork(chainId);
  };

  return (
    <ErrorBoundary>
      <ResponsiveContainer maxWidth="2xl" padding="lg">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Web3 Wallet Connection</h1>
            <p className="text-muted-foreground">
              Example implementation of Web3 wallet management
            </p>
          </div>

          {/* Web3 Status Display */}
          <Web3Status
            status={isConnected ? 'connected' : isConnecting ? 'connecting' : 'disconnected'}
            address={wallet?.address}
            chainId={wallet?.chainId}
            error={error?.message}
          />

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Connection Error</AlertTitle>
              <AlertDescription className="flex items-center justify-between">
                <span>{error.message}</span>
                <Button variant="outline" size="sm" onClick={clearError}>
                  Clear
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* Connection Actions */}
          <div className="space-y-4">
            {!isConnected ? (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Connect Wallet</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {connectors.map((connector) => (
                    <Button
                      key={connector.id}
                      onClick={() => handleConnect(connector.id)}
                      disabled={isConnecting}
                      className="w-full"
                      variant="outline"
                    >
                      {isConnecting ? (
                        <span>Connecting...</span>
                      ) : (
                        <span>Connect {connector.name}</span>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">Wallet Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Address:</strong> {wallet?.address}</p>
                    <p><strong>Chain ID:</strong> {wallet?.chainId}</p>
                    <p><strong>Balance:</strong> {wallet?.balance || 'Loading...'}</p>
                    <p><strong>Connector:</strong> {wallet?.isConnected ? 'Connected' : 'Disconnected'}</p>
                  </div>
                </div>

                {/* Chain Switching */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Switch Network</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => handleSwitchChain(1)}
                      disabled={wallet?.chainId === 1}
                      size="sm"
                      variant={wallet?.chainId === 1 ? "default" : "outline"}
                    >
                      Ethereum
                    </Button>
                    <Button
                      onClick={() => handleSwitchChain(137)}
                      disabled={wallet?.chainId === 137}
                      size="sm"
                      variant={wallet?.chainId === 137 ? "default" : "outline"}
                    >
                      Polygon
                    </Button>
                    <Button
                      onClick={() => handleSwitchChain(31337)}
                      disabled={wallet?.chainId === 31337}
                      size="sm"
                      variant={wallet?.chainId === 31337 ? "default" : "outline"}
                    >
                      Hardhat
                    </Button>
                  </div>
                </div>

                {/* Disconnect */}
                <Button
                  onClick={handleDisconnect}
                  variant="destructive"
                  className="w-full"
                >
                  Disconnect Wallet
                </Button>
              </div>
            )}
          </div>

          {/* Usage Instructions */}
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Usage Instructions</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>1. Connect your wallet using one of the available connectors</li>
              <li>2. View your wallet information and balance</li>
              <li>3. Switch between different networks</li>
              <li>4. Disconnect when finished</li>
              <li>5. All errors are caught and displayed gracefully</li>
            </ul>
          </div>
        </div>
      </ResponsiveContainer>
    </ErrorBoundary>
  );
};
