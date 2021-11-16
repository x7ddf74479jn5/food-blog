import { useRouter } from "next/router";
import type { FallbackProps } from "react-error-boundary";
import { ErrorBoundary } from "react-error-boundary";
import { FaChevronLeft, FaRegTired } from "react-icons/fa";

import { UrlTable } from "@/utils/paths/url";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="flex flex-col gap-8 justify-center items-center mt-8" role="alert">
      <FaRegTired className="w-32 h-32 text-gray-500" />
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button
        // eslint-disable-next-line react/jsx-handler-names
        onClick={resetErrorBoundary}
        className="flex flex-row gap-2 justify-center items-center py-2 px-4 text-white bg-green-700 hover:bg-opacity-90 rounded-xl border-2 border-green-600"
      >
        <FaChevronLeft />
        <span>Homeに戻る</span>
      </button>
    </div>
  );
};

export const ErrorBoundaryBase: React.FC<{ children: React.ReactNode; callback?: () => void }> = ({
  children,
  callback,
}) => {
  const router = useRouter();

  const handleReset = () => {
    callback && callback();
    router.push(UrlTable.home);
  };
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset}>
      {children}
    </ErrorBoundary>
  );
};
