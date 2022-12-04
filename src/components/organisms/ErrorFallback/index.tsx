import { useRouter } from "next/navigation";
import { FaChevronLeft, FaRegTired } from "react-icons/fa";

import { urlTable } from "@/utils/paths/url";

type ErrorFallbackProps = { heading: string; message: string; onReset?: () => void };

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ heading, message, onReset }) => {
  const router = useRouter();
  const handleClick = () => {
    onReset && onReset();
    router.push(urlTable.home);
  };

  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-12" role="alert">
      <FaRegTired className="h-32 w-32 text-gray-500" />
      <div className="mx-auto flex flex-col gap-8 text-center">
        <h1>{heading}</h1>
        <p>{message}</p>
      </div>
      <button
        onClick={handleClick}
        className="flex flex-row items-center justify-center gap-2 rounded-xl border-2 border-green-600 bg-green-700 py-2 px-4 text-white hover:bg-green-700/90"
      >
        <FaChevronLeft />
        <span>Homeに戻る</span>
      </button>
    </div>
  );
};
