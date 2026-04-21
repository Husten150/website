# Custom Hooks Documentation

This document provides comprehensive documentation for the custom hooks available in this Web3 dApp starter kit.

## useWeb3 Hook (`hooks/useWeb3.ts`)

A comprehensive hook for managing Web3 wallet connections with enhanced error handling and auto-connect functionality.

### Features
- Auto-connect with last used wallet
- Error handling with customizable callbacks
- Chain switching support
- Balance tracking
- TypeScript support

### Usage
```tsx
import { useWeb3 } from '@/hooks/useWeb3';

function MyComponent() {
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
    onError: (error) => console.error('Web3 error:', error),
    onSuccess: (wallet) => console.log('Connected:', wallet)
  });

  return (
    <div>
      {isConnected ? (
        <div>
          <p>Connected: {wallet?.address}</p>
          <button onClick={disconnectWallet}>Disconnect</button>
        </div>
      ) : (
        <div>
          <button onClick={() => connectWallet()}>Connect Wallet</button>
        </div>
      )}
    </div>
  );
}
```

### Options
- `autoConnect` (boolean): Automatically connect to last used wallet on mount
- `onError` (function): Callback for error handling
- `onSuccess` (function): Callback for successful connection

### Return Values
- `wallet`: Wallet information object
- `isConnected`: Connection status
- `isConnecting`: Loading state
- `error`: Error object if any
- `connectors`: Available wallet connectors
- `connectWallet`: Function to connect wallet
- `disconnectWallet`: Function to disconnect wallet
- `switchChainNetwork`: Function to switch blockchain network
- `clearError`: Function to clear error state

## useLocalStorage Hook (`hooks/useLocalStorage.ts`)

A TypeScript-safe hook for managing localStorage with error handling and SSR support.

### Features
- TypeScript support with generic types
- Server-side rendering safe
- Error handling for JSON parsing
- Automatic synchronization

### Usage
```tsx
import { useLocalStorage } from '@/hooks/useLocalStorage';

function MyComponent() {
  const [settings, setSettings, removeSettings] = useLocalStorage('app-settings', {
    theme: 'dark',
    notifications: true
  });

  const updateTheme = (theme: string) => {
    setSettings(prev => ({ ...prev, theme }));
  };

  const clearSettings = () => {
    removeSettings();
  };

  return (
    <div>
      <p>Current theme: {settings.theme}</p>
      <button onClick={() => updateTheme('light')}>Light Mode</button>
      <button onClick={clearSettings}>Clear Settings</button>
    </div>
  );
}
```

### Parameters
- `key` (string): localStorage key
- `initialValue` (T): Initial value if no stored value exists

### Return Values
- `[value, setValue, removeValue]` tuple:
  - `value`: Current stored value
  - `setValue`: Function to update stored value
  - `removeValue`: Function to remove stored value

## Best Practices

### Error Handling
Always implement proper error handling when using Web3 hooks:

```tsx
const { error, clearError } = useWeb3({
  onError: (error) => {
    // Show user-friendly error message
    toast.error(`Connection failed: ${error.message}`);
    
    // Log detailed error for debugging
    console.error('Web3 connection error:', error);
  }
});
```

### Loading States
Provide feedback during loading states:

```tsx
const { isConnecting, isConnected } = useWeb3();

return (
  <div>
    {isConnecting && <Spinner />}
    {isConnected && <ConnectedState />}
    {!isConnected && !isConnecting && <ConnectButton />}
  </div>
);
```

### TypeScript Usage
Leverage TypeScript for better type safety:

```tsx
interface AppSettings {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
}

const [settings, setSettings] = useLocalStorage<AppSettings>('settings', {
  theme: 'light',
  language: 'en',
  notifications: true
});
```

### Component Integration
Combine hooks with UI components for better UX:

```tsx
function WalletConnect() {
  const web3 = useWeb3();
  
  return (
    <ErrorBoundary>
      <Web3Status
        status={web3.isConnected ? 'connected' : 'disconnected'}
        address={web3.wallet?.address}
        chainId={web3.wallet?.chainId}
        error={web3.error?.message}
      />
      
      {!web3.isConnected && (
        <Button onClick={() => web3.connectWallet()} disabled={web3.isConnecting}>
          {web3.isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      )}
    </ErrorBoundary>
  );
}
```

## Migration from wagmi

If you're migrating from direct wagmi usage:

### Before (Direct wagmi)
```tsx
import { useAccount, useConnect, useDisconnect } from 'wagmi';

function MyComponent() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  
  // Manual error handling and state management
}
```

### After (useWeb3 hook)
```tsx
import { useWeb3 } from '@/hooks/useWeb3';

function MyComponent() {
  const { wallet, connectWallet, disconnectWallet, error } = useWeb3({
    onError: (error) => toast.error(error.message)
  });
  
  // Simplified usage with built-in error handling
}
```

## Testing

When testing components that use these hooks:

```tsx
import { renderHook } from '@testing-library/react';
import { useWeb3 } from '@/hooks/useWeb3';

describe('useWeb3', () => {
  it('should initialize with correct state', () => {
    const { result } = renderHook(() => useWeb3());
    
    expect(result.current.isConnected).toBe(false);
    expect(result.current.isConnecting).toBe(false);
    expect(result.current.wallet).toBe(null);
  });
});
```

## Contributing

When adding new hooks:
1. Follow the established patterns
2. Include comprehensive TypeScript types
3. Add error handling where appropriate
4. Include SSR considerations
5. Update this documentation
6. Add usage examples
