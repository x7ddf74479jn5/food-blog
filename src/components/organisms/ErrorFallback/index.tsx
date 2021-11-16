import { useRouter } from "next/router";
import { FaChevronLeft, FaRegTired } from "react-icons/fa";

import { UrlTable } from "@/utils/paths/url";

type ErrorFallbackProps = { heading: string; message: string };

export const ErrorFallback: React.VFC<ErrorFallbackProps> = ({ heading, message }) => {
  const router = useRouter();
  const handleClick = () => router.push(UrlTable.home);

  return (
    <div className="flex flex-col gap-12 justify-center items-center mt-8" role="alert">
      <FaRegTired className="w-32 h-32 text-gray-500" />
      <div className="flex flex-col gap-8 mx-auto text-center">
        <h1 className="text-4xl">{heading}</h1>
        <p>{message}</p>
      </div>
      <button
        onClick={handleClick}
        className="flex flex-row gap-2 justify-center items-center py-2 px-4 text-white bg-green-700 hover:bg-opacity-90 rounded-xl border-2 border-green-600"
      >
        <FaChevronLeft />
        <span>Homeに戻る</span>
      </button>
    </div>
  );
};
