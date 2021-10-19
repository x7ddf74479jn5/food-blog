import type { ReactNode, VFC } from "react";
import type { FallbackProps } from "react-error-boundary";
import { ErrorBoundary } from "react-error-boundary";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center" role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export const HttpErrorBoundary: VFC<{ children: ReactNode }> = ({ children }) => {
  return <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>;
};
