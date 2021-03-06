import type { InferGetStaticPropsType, NextPage } from "next";
import { FaRegTired } from "react-icons/fa";

import { HtmlHeadNoIndex } from "@/components/functions/meta";
import { RootLayout } from "@/components/layouts/RootLayout";

import { getStaticProps as _getStaticProps } from "../_error/index.page";

type OfflineProps = InferGetStaticPropsType<typeof getStaticProps>;

const Offline: NextPage<OfflineProps> = ({ config, categories }) => (
  <RootLayout config={config} categories={categories}>
    <HtmlHeadNoIndex />
    <div className="flex flex-col gap-12 justify-center items-center mt-8" role="alert">
      <FaRegTired className="w-32 h-32 text-gray-500" />
      <div className="flex flex-col gap-8 mx-auto text-center">
        <h1>オフラインページ</h1>
        <p>インターネットに接続のうえ、ご利用ください。</p>
      </div>
    </div>
  </RootLayout>
);

export const getStaticProps = _getStaticProps;
export default Offline;
