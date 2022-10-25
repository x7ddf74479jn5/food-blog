import { memo, useEffect } from "react";
import type { FallbackProps } from "react-error-boundary";
import { ErrorBoundary } from "react-error-boundary";

import { ErrorFallback } from "@/components/organisms/ErrorFallback";
import { sentryLog } from "@/lib/sentry";
import { toIdleTask } from "@/utils";

const FallbackComponent = ({ error, resetErrorBoundary }: FallbackProps) => {
  const handleReset = () => resetErrorBoundary();

  useEffect(() => {
    if (error) {
      toIdleTask(() => sentryLog(error, { tags: { type: "UI" } }));
    }
  }, [error]);

  return (
    <ErrorFallback heading="Something went wrong" message="サイト上で問題が発生しました。" onReset={handleReset} />
  );
};

export const ErrorBoundaryBase: React.FC<{ children: React.ReactNode; callback?: () => void }> = memo(
  ({ children, callback }) => {
    const handleReset = () => {
      callback?.();
    };

    return (
      <ErrorBoundary FallbackComponent={FallbackComponent} onReset={handleReset}>
        {children}
      </ErrorBoundary>
    );
  }
);

ErrorBoundaryBase.displayName = "ErrorBoundaryBase";
