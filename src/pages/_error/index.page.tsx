import * as Sentry from "@sentry/nextjs";
import type { NextPage } from "next";

import { HtmlHeadNoIndex } from "@/components/functions/meta";
import { ErrorFallback } from "@/components/organisms/ErrorFallback";

const useErrorState = (statusCode: number | undefined) => {
  switch (statusCode) {
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
};

type ErrorPageProps = {
  statusCode?: number | undefined;
};

const ErrorPage: NextPage<ErrorPageProps> = ({ statusCode }) => {
  const state = useErrorState(statusCode);

  return (
    <>
      <HtmlHeadNoIndex />
      <ErrorFallback {...state} />
    </>
  );
};

ErrorPage.getInitialProps = async (contextData) => {
  await Sentry.captureUnderscoreErrorException(contextData);

  const statusCode = contextData.err?.statusCode;

  return {
    statusCode,
  };
};

export default ErrorPage;
