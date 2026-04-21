'use client';

import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { LoadingOverlay } from '@/components/ui/loading-overlay';
import { ResponsiveContainer } from '@/components/ui/responsive-container';
import { Web3Status } from '@/components/ui/web3-status';
import ErrorBoundary from '@/components/ErrorBoundary';

export const ComponentShowcase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [alertVariant, setAlertVariant] = useState<'default' | 'destructive' | 'warning' | 'success' | 'info'>('default');

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  const simulateError = () => {
    setShowError(true);
    setTimeout(() => setShowError(false), 5000);
  };

  return (
    <ErrorBoundary>
      <ResponsiveContainer maxWidth="2xl" padding="lg">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">UI Components Showcase</h1>
            <p className="text-muted-foreground">
              Examples of all available UI components
            </p>
          </div>

          {/* Alert Components */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Alert Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Alert variant="default">
                <AlertTitle>Default Alert</AlertTitle>
                <AlertDescription>This is a default alert message.</AlertDescription>
              </Alert>
              
              <Alert variant="success">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Operation completed successfully!</AlertDescription>
              </Alert>
              
              <Alert variant="warning">
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>Please review this information carefully.</AlertDescription>
              </Alert>
              
              <Alert variant="info">
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>Here's something you should know.</AlertDescription>
              </Alert>
              
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Something went wrong. Please try again.</AlertDescription>
              </Alert>
            </div>
          </div>

          {/* Loading Components */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Loading Components</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Spinners</h3>
                <div className="flex items-center space-x-4">
                  <Spinner size="sm" />
                  <Spinner size="md" />
                  <Spinner size="lg" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Skeletons</h3>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-8 w-full" />
                  <div className="grid grid-cols-3 gap-2">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Loading Overlay</h3>
                <div className="relative h-32 bg-muted rounded-lg">
                  <LoadingOverlay 
                    isLoading={isLoading} 
                    text="Loading data..."
                  >
                    <div className="p-4">
                      <p>Content that will be hidden during loading</p>
                    </div>
                  </LoadingOverlay>
                </div>
                <Button onClick={simulateLoading} className="mt-2">
                  Simulate Loading
                </Button>
              </div>
            </div>
          </div>

          {/* Web3 Status */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Web3 Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Web3Status 
                status="disconnected"
              />
              <Web3Status 
                status="connecting"
              />
              <Web3Status 
                status="connected" 
                address="0x742d35Cc6634C0532925a3b8D4C9db96C4b4Db45" 
                chainId={1}
              />
              <Web3Status 
                status="error" 
                error="Failed to connect to wallet"
              />
            </div>
          </div>

          {/* Interactive Demo */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Interactive Demo</h2>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button onClick={simulateLoading}>
                  Toggle Loading
                </Button>
                <Button onClick={simulateError} variant="destructive">
                  Simulate Error
                </Button>
                <Button 
                  onClick={() => setAlertVariant('success')}
                  variant="outline"
                >
                  Show Success
                </Button>
                <Button 
                  onClick={() => setAlertVariant('warning')}
                  variant="outline"
                >
                  Show Warning
                </Button>
                <Button 
                  onClick={() => setAlertVariant('info')}
                  variant="outline"
                >
                  Show Info
                </Button>
              </div>

              {showError && (
                <Alert variant="destructive">
                  <AlertTitle>Demo Error</AlertTitle>
                  <AlertDescription>
                    This is a simulated error for demonstration purposes.
                  </AlertDescription>
                </Alert>
              )}

              {alertVariant !== 'default' && (
                <Alert variant={alertVariant}>
                  <AlertTitle>
                    {alertVariant.charAt(0).toUpperCase() + alertVariant.slice(1)} Message
                  </AlertTitle>
                  <AlertDescription>
                    This is a {alertVariant} message for demonstration.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>

          {/* Usage Guidelines */}
          <div className="bg-muted p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Usage Guidelines</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h3 className="font-medium mb-2">Best Practices</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>Use ErrorBoundary for error-prone components</li>
                  <li>Implement loading states for async operations</li>
                  <li>Use appropriate alert variants for different message types</li>
                  <li>Make components responsive with ResponsiveContainer</li>
                  <li>Provide clear feedback for Web3 operations</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Accessibility</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>All components include proper ARIA attributes</li>
                  <li>Keyboard navigation is supported</li>
                  <li>Screen reader compatibility is maintained</li>
                  <li>Semantic HTML structure is used</li>
                  <li>Color contrast meets WCAG standards</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </ResponsiveContainer>
    </ErrorBoundary>
  );
};
