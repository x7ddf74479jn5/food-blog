import type { InferGetStaticPropsType, NextPage } from "next";

import { HtmlHeadNoIndex } from "@/components/atoms/meta";
import { RootLayout } from "@/components/layouts/RootLayout";
import { ErrorFallback } from "@/components/organisms/ErrorFallback";

import { getStaticProps as _getStaticProps } from "../_error/index.page";

type Error500Props = InferGetStaticPropsType<typeof getStaticProps>;

const Error500: NextPage<Error500Props> = ({ config }) => (
  <RootLayout config={config}>
    <HtmlHeadNoIndex />
    <ErrorFallback heading="500 - Internal Server Error" message="サーバー側で問題が発生しました。" />
  </RootLayout>
);

export const getStaticProps = _getStaticProps;

export default Error500;
