import * as React from "react"
import { cn } from "@/lib/utils"
import { Spinner } from "./spinner"

interface LoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean
  text?: string
}

const LoadingOverlay = React.forwardRef<HTMLDivElement, LoadingOverlayProps>(
  ({ className, isLoading = true, text = "Loading...", children, ...props }, ref) => {
    if (!isLoading) {
      return <>{children}</>
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center space-y-4 p-8",
          className
        )}
        {...props}
      >
        <Spinner size="lg" />
        {text && (
          <p className="text-sm text-muted-foreground animate-pulse">
            {text}
          </p>
        )}
      </div>
    )
  }
)
LoadingOverlay.displayName = "LoadingOverlay"

export { LoadingOverlay }
