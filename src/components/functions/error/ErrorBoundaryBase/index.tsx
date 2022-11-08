import dynamic from "next/dynamic";
import { memo, useEffect } from "react";
import type { FallbackProps } from "react-error-boundary";
import { ErrorBoundary } from "react-error-boundary";

const ErrorFallback = dynamic(
  () => import("@/components/organisms/ErrorFallback").then(({ ErrorFallback }) => ErrorFallback),
  { ssr: false }
);

const FallbackComponent = ({ error, resetErrorBoundary }: FallbackProps) => {
  const handleReset = () => resetErrorBoundary();

  useEffect(() => {
    if (error) {
      const sendError = async () => {
        const { toIdleTask } = await import("@/utils");
        toIdleTask(async () => {
          const { sentryLog } = await import("@/lib/sentry");
          toIdleTask(() => sentryLog(error, { tags: { type: "UI" } }));
        });
      };

      sendError();
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
