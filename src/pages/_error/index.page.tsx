import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

import { HtmlHeadNoIndex } from "@/components/functions/meta";
import { RootLayout } from "@/components/layouts/RootLayout";
import { ErrorFallback } from "@/components/organisms/ErrorFallback";
import type { TCategory, TConfig } from "@/types";
import { fetchCategories, fetchConfig } from "@/api";

type ErrorProps = InferGetStaticPropsType<typeof getStaticProps>;

const ErrorPage: NextPage<ErrorProps> = ({ config, categories }) => (
  <RootLayout config={config} categories={categories}>
    <HtmlHeadNoIndex />
    <ErrorFallback heading="Unhandled Error" message="サイト上で問題が発生しました。" />
  </RootLayout>
);

type StaticProps = {
  config: TConfig;
  categories: TCategory[];
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const config = await fetchConfig();
  const categories = await fetchCategories();

  return {
    props: {
      config,
      categories,
    },
  };
};

export default ErrorPage;
