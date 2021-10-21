import { useRouter } from "next/router";
import type { FallbackProps } from "react-error-boundary";
import { ErrorBoundary } from "react-error-boundary";
import { FaRegTired } from "react-icons/fa";

import { UrlTable } from "@/utils/paths/url";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center" role="alert">
      <FaRegTired className="w-32 h-32 text-gray-500" />
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <button onClick={resetErrorBoundary}>Home</button>
    </div>
  );
};

export const ErrorBoundaryBase: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  const handleReset = () => {
    router.push(UrlTable.home);
  };
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset}>
      {children}
    </ErrorBoundary>
  );
};
