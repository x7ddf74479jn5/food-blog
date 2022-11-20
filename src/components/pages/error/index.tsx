"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { FaChevronLeft, FaRegTired } from "react-icons/fa";

import { HtmlHeadNoIndex } from "@/components/meta/HtmlHead";
import { urlTable } from "@/utils/paths/url";

export const useError = ({ error, onReset, status }: Props) => {
  const errorState = (() => {
    switch (status) {
      case 404:
        return {
          heading: "404 - Not Found",
          message: "ページが見つかりませんでした",
        };
      case 500:
        return { heading: "500 - Server Error", message: "サーバーで問題が発生しました" };
      default:
        return { heading: "Unhandled Error", message: "サイト上で問題が発生しました" };
    }
  })();
  const router = useRouter();
  const reset = useCallback(() => {
    onReset?.();
    router.push(urlTable.home);
  }, [onReset, router]);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !error) return;

    const sendError = async () => {
      const { toIdleTask } = await import("@/utils");
      toIdleTask(async () => {
        const { sentryLog } = await import("@/lib/sentry");
        toIdleTask(() => sentryLog(error));
      });
    };

    sendError();
  }, [error]);

  return {
    errorState,
    reset,
  };
};

type Props = {
  status?: 404 | 500 | undefined;
  error?: Error;
  onReset?: () => void;
};

export const Error: React.FC<Props> = (props) => {
  const { errorState, reset } = useError(props);
  const { heading, message } = errorState;
  const handleResetClick = reset;

  return (
    <>
      <HtmlHeadNoIndex />
      <div className="mt-8 flex flex-col items-center justify-center gap-12" role="alert">
        <FaRegTired className="h-32 w-32 text-gray-500" />
        <div className="mx-auto flex flex-col gap-8 text-center">
          <h1>{heading}</h1>
          <p>{message}</p>
        </div>
        <button
          onClick={handleResetClick}
          className="flex flex-row items-center justify-center gap-2 rounded-xl border-2 border-green-600 bg-green-700 py-2 px-4 text-white hover:bg-green-700/90"
        >
          <FaChevronLeft />
          <span>Homeに戻る</span>
        </button>
      </div>
    </>
  );
};
