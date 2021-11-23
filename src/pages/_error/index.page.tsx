import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

import { HtmlHeadNoIndex } from "@/components/functions/meta";
import { RootLayout } from "@/components/layouts/RootLayout";
import { ErrorFallback } from "@/components/organisms/ErrorFallback";
import type { TConfig } from "@/types";
import { fetchConfig } from "@/utils/fetcher";

type ErrorProps = InferGetStaticPropsType<typeof getStaticProps>;

const ErrorPage: NextPage<ErrorProps> = ({ config }) => (
  <RootLayout config={config}>
    <HtmlHeadNoIndex />
    <ErrorFallback heading="Unhandled Error" message="サイト上で問題が発生しました。" />
  </RootLayout>
);

type StaticProps = {
  config: TConfig;
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const _config = await fetchConfig();

  return {
    props: {
      config: _config as TConfig,
    },
  };
};

export default ErrorPage;
