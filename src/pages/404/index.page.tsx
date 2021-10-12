import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

import { RootLayout } from "@/components/layouts/RootLayout";
// import { MetaNoIndex } from '@/components/atoms/meta/MetaNoIndex';
import type { TConfig } from "@/types";
import { fetchConfig } from "@/utils/fetcher";

type Error404Props = InferGetStaticPropsType<typeof getStaticProps>;

const Error404: NextPage<Error404Props> = ({ config }) => (
  <RootLayout config={config}>
    {/* <MetaNoIndex /> */}

    <div className="relative pt-24 my-0 mx-auto w-full ">
      <div className="flex flex-col gap-2 mx-auto text-center">
        <h1 className="text-4xl">404 - Not Found</h1>
        <p>ページが見つかりませんでした。</p>
      </div>
    </div>
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

export default Error404;
