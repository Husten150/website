'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAccount, useConnect, useDisconnect, useSwitchChain, useBalance } from 'wagmi';
import { WalletInfo, Web3Error, ChainConfig } from '@/types/web3';

interface UseWeb3Options {
  autoConnect?: boolean;
  onError?: (error: Web3Error) => void;
  onSuccess?: (wallet: WalletInfo) => void;
}

export const useWeb3 = (options: UseWeb3Options = {}) => {
  const { address, chainId, isConnected, connector } = useAccount();
  const { connect, connectors, isPending: isConnecting, error: connectError } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitching, error: switchError } = useSwitchChain();
  const { data: balance, isLoading: isBalanceLoading } = useBalance({ address });

  const [error, setError] = useState<Web3Error | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Handle connection errors
  useEffect(() => {
    if (connectError) {
      const web3Error: Web3Error = {
        code: connectError.code || 'CONNECT_ERROR',
        message: connectError.message,
        data: connectError
      };
      setError(web3Error);
      options.onError?.(web3Error);
    }
  }, [connectError, options]);

  // Handle chain switching errors
  useEffect(() => {
    if (switchError) {
      const web3Error: Web3Error = {
        code: switchError.code || 'SWITCH_CHAIN_ERROR',
        message: switchError.message,
        data: switchError
      };
      setError(web3Error);
      options.onError?.(web3Error);
    }
  }, [switchError, options]);

  // Auto-connect functionality
  useEffect(() => {
    if (options.autoConnect && !isInitialized && !isConnected && connectors.length > 0) {
      const attemptAutoConnect = async () => {
        try {
          const lastConnectorId = localStorage.getItem('lastConnectedConnector');
          if (lastConnectorId) {
            const connector = connectors.find(c => c.id === lastConnectorId);
            if (connector) {
              await connect({ connector });
            }
          }
        } catch (error) {
          console.warn('Auto-connect failed:', error);
        } finally {
          setIsInitialized(true);
        }
      };
      attemptAutoConnect();
    } else if (!options.autoConnect) {
      setIsInitialized(true);
    }
  }, [options.autoConnect, isInitialized, isConnected, connectors, connect]);

  // Create wallet info object
  const getWalletInfo = useCallback((): WalletInfo | null => {
    if (!address || !chainId) return null;

    return {
      address,
      chainId,
      balance: balance?.formatted,
      isConnected
    };
  }, [address, chainId, balance, isConnected]);

  // Connect wallet
  const connectWallet = useCallback(async (connectorId?: string) => {
    try {
      setError(null);
      const connector = connectorId 
        ? connectors.find(c => c.id === connectorId)
        : connectors[0];
      
      if (!connector) {
        throw new Error('No connector available');
      }

      await connect({ connector });
      
      if (connectorId) {
        localStorage.setItem('lastConnectedConnector', connectorId);
      }

      const walletInfo = getWalletInfo();
      if (walletInfo) {
        options.onSuccess?.(walletInfo);
      }
    } catch (error) {
      const web3Error: Web3Error = {
        code: 'CONNECT_FAILED',
        message: error instanceof Error ? error.message : 'Failed to connect wallet',
        data: error
      };
      setError(web3Error);
      options.onError?.(web3Error);
    }
  }, [connectors, connect, getWalletInfo, options]);

  // Disconnect wallet
  const disconnectWallet = useCallback(async () => {
    try {
      setError(null);
      await disconnect();
      localStorage.removeItem('lastConnectedConnector');
    } catch (error) {
      const web3Error: Web3Error = {
        code: 'DISCONNECT_FAILED',
        message: error instanceof Error ? error.message : 'Failed to disconnect wallet',
        data: error
      };
      setError(web3Error);
      options.onError?.(web3Error);
    }
  }, [disconnect, options]);

  // Switch chain
  const switchChainNetwork = useCallback(async (targetChainId: number) => {
    try {
      setError(null);
      await switchChain({ chainId: targetChainId });
    } catch (error) {
      const web3Error: Web3Error = {
        code: 'SWITCH_CHAIN_FAILED',
        message: error instanceof Error ? error.message : 'Failed to switch chain',
        data: error
      };
      setError(web3Error);
      options.onError?.(web3Error);
    }
  }, [switchChain, options]);

  // Clear errors
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // State
    wallet: getWalletInfo(),
    isConnected,
    isConnecting: isConnecting || isSwitching,
    isBalanceLoading,
    error,
    connectors,
    
    // Actions
    connectWallet,
    disconnectWallet,
    switchChainNetwork,
    clearError,
    
    // Raw wagmi hooks for advanced usage
    wagmi: {
      address,
      chainId,
      connector,
      balance: balance?.formatted,
      isConnecting,
      isSwitching
    }
  };
};
