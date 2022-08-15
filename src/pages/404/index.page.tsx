import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

import { fetchCategories, fetchConfig } from "@/api";
import { HtmlHeadNoIndex } from "@/components/functions/meta";
import { RootLayout } from "@/components/layouts/RootLayout";
import { ErrorFallback } from "@/components/organisms/ErrorFallback";
import type { TCategory, TConfig } from "@/types";

type Error404Props = InferGetStaticPropsType<typeof getStaticProps>;

const Error404Page: NextPage<Error404Props> = ({ config, categories }) => (
  <RootLayout config={config} categories={categories}>
    <HtmlHeadNoIndex />
    <ErrorFallback heading="404 - Not Found" message="ページが見つかりませんでした" />
  </RootLayout>
);

export default Error404Page;

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
