# UI Components Documentation

This document provides comprehensive documentation for the UI components available in this Web3 dApp starter kit.

## New Components Added

### Alert Component (`components/ui/alert.tsx`)

A versatile alert component for displaying messages with different severity levels.

#### Variants
- `default` - Standard gray alert
- `destructive` - Red alert for errors
- `warning` - Yellow alert for warnings
- `success` - Green alert for success messages
- `info` - Blue alert for informational messages

#### Usage
```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong!</AlertDescription>
</Alert>
```

### Skeleton Component (`components/ui/skeleton.tsx`)

A loading skeleton component for displaying placeholder content while data is loading.

#### Usage
```tsx
import { Skeleton } from "@/components/ui/skeleton"

<Skeleton className="h-4 w-[250px]" />
<Skeleton className="h-8 w-full" />
```

### Spinner Component (`components/ui/spinner.tsx`)

A loading spinner component with different sizes.

#### Sizes
- `sm` - Small spinner (16px)
- `md` - Medium spinner (24px)
- `lg` - Large spinner (32px)

#### Usage
```tsx
import { Spinner } from "@/components/ui/spinner"

<Spinner size="lg" />
<Spinner className="text-blue-500" />
```

### Loading Overlay Component (`components/ui/loading-overlay.tsx`)

A full loading overlay component that combines spinner with text.

#### Usage
```tsx
import { LoadingOverlay } from "@/components/ui/loading-overlay"

<LoadingOverlay isLoading={true} text="Loading data..." />
<LoadingOverlay isLoading={false}>
  <YourContent />
</LoadingOverlay>
```

### Web3 Status Component (`components/ui/web3-status.tsx`)

A specialized component for displaying Web3 wallet connection status.

#### Status Types
- `connecting` - Shows connecting state with spinner
- `connected` - Shows connected wallet info
- `disconnected` - Shows disconnected state
- `error` - Shows error message

#### Usage
```tsx
import { Web3Status } from "@/components/ui/web3-status"

<Web3Status 
  status="connected" 
  address="0x1234...5678" 
  chainId={1} 
/>
```

### Error Boundary Component (`components/ErrorBoundary.tsx`)

A React error boundary component for catching and displaying errors gracefully.

#### Usage
```tsx
import ErrorBoundary from "@/components/ErrorBoundary"

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

## TypeScript Types (`types/web3.ts`)

Comprehensive TypeScript types for Web3 dApp development including:

- Wallet and chain configuration types
- Ad slot and content types
- Transaction and analytics types
- Component prop types
- Hook return types

#### Key Types
```tsx
import { WalletInfo, AdSlot, TransactionStatus, Web3Error } from "@/types/web3"

// Use in your components and hooks
const wallet: WalletInfo = {
  address: "0x1234...",
  chainId: 1,
  isConnected: true
}
```

## Accessibility Features

All components include:
- Proper ARIA attributes
- Keyboard navigation support
- Screen reader compatibility
- Semantic HTML structure

## Best Practices

1. **Error Handling**: Always wrap components that might fail with ErrorBoundary
2. **Loading States**: Use LoadingOverlay or Skeleton components for async operations
3. **Web3 Status**: Use Web3Status component for wallet connection feedback
4. **TypeScript**: Leverage the provided types for better type safety

## Component Patterns

All components follow these patterns:
- Forward refs for DOM manipulation
- Consistent className prop support
- Proper TypeScript typing
- Accessibility first approach
- Tailwind CSS for styling

## Integration Examples

### Complete Web3 Component Example
```tsx
import { Web3Status, Alert, LoadingOverlay } from "@/components/ui"
import { WalletInfo } from "@/types/web3"

function WalletComponent() {
  const [wallet, setWallet] = useState<WalletInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <LoadingOverlay isLoading={isLoading} text="Connecting wallet...">
      <Web3Status 
        status={wallet ? 'connected' : 'disconnected'}
        address={wallet?.address}
        chainId={wallet?.chainId}
        error={error}
      />
    </LoadingOverlay>
  )
}
```

## Contributing

When adding new components:
1. Follow the established patterns
2. Include proper TypeScript types
3. Add accessibility features
4. Update this documentation
5. Include usage examples
