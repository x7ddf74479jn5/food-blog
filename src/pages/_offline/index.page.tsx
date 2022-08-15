import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { FaRegTired } from "react-icons/fa";

import { fetchCategories, fetchConfig } from "@/api";
import { HtmlHeadNoIndex } from "@/components/functions/meta";
import { RootLayout } from "@/components/layouts/RootLayout";
import type { TCategory, TConfig } from "@/types";

type OfflineProps = InferGetStaticPropsType<typeof getStaticProps>;

const Offline: NextPage<OfflineProps> = ({ config, categories }) => (
  <RootLayout config={config} categories={categories}>
    <HtmlHeadNoIndex />
    <div className="mt-8 flex flex-col items-center justify-center gap-12" role="alert">
      <FaRegTired className="h-32 w-32 text-gray-500" />
      <div className="mx-auto flex flex-col gap-8 text-center">
        <h1>オフラインページ</h1>
        <p>インターネットに接続のうえ、ご利用ください。</p>
      </div>
    </div>
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
export default Offline;
