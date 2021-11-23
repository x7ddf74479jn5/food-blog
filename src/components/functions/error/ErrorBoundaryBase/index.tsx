import type { FallbackProps } from "react-error-boundary";
import { ErrorBoundary } from "react-error-boundary";

import { ErrorFallback } from "@/components/organisms/ErrorFallback";

const FallbackComponent = ({ error, resetErrorBoundary }: FallbackProps) => {
  const handleReset = () => resetErrorBoundary();
  console.error(error);

  return (
    <ErrorFallback heading="Something went wrong" message="サイト上で問題が発生しました。" onReset={handleReset} />
  );
};

export const ErrorBoundaryBase: React.FC<{ children: React.ReactNode; callback?: () => void }> = ({
  children,
  callback,
}) => {
  const handleReset = () => {
    callback && callback();
  };

  return (
    <ErrorBoundary FallbackComponent={FallbackComponent} onReset={handleReset}>
      {children}
    </ErrorBoundary>
  );
};
