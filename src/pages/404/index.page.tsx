import type { InferGetStaticPropsType, NextPage } from "next";

import { HtmlHeadNoIndex } from "@/components/functions/meta";
import { RootLayout } from "@/components/layouts/RootLayout";
import { ErrorFallback } from "@/components/organisms/ErrorFallback";

import { getStaticProps as _getStaticProps } from "../_error/index.page";

type Error404Props = InferGetStaticPropsType<typeof getStaticProps>;

const Error404: NextPage<Error404Props> = ({ config, categories }) => (
  <RootLayout config={config} categories={categories}>
    <HtmlHeadNoIndex />
    <ErrorFallback heading="404 - Not Found" message="ページが見つかりませんでした。" />
  </RootLayout>
);

export const getStaticProps = _getStaticProps;

export default Error404;
