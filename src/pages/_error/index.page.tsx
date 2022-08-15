import * as Sentry from "@sentry/nextjs";
import type { NextPage } from "next";

import { HtmlHeadNoIndex } from "@/components/functions/meta";
import { ErrorFallback } from "@/components/organisms/ErrorFallback";

type ErrorPageProps = {
  pageTitle: string;
  message: string;
};

const ErrorPage: NextPage<ErrorPageProps> = ({ pageTitle, message }) => (
  <>
    <HtmlHeadNoIndex />
    <ErrorFallback heading={pageTitle} message={message} />
  </>
);

ErrorPage.getInitialProps = async (contextData) => {
  await Sentry.captureUnderscoreErrorException(contextData);

  const { err } = contextData;

  let pageTitle;
  let message;

  switch (err?.statusCode) {
    case 404:
      pageTitle = "404 - Not Found";
      message = "ページが見つかりませんでした";
      break;
    case 500:
      pageTitle = "500 - Server Error";
      message = "サーバーで問題が発生しました";
      break;
    default:
      pageTitle = "Unhandled Error";
      message = "サイト上で問題が発生しました";
  }

  return {
    pageTitle,
    message,
  };
};

export default ErrorPage;
