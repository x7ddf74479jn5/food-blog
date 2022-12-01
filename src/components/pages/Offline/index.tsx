import Head from "next/head";
import { FaRegTired } from "react-icons/fa";

import { HtmlHeadNoIndex } from "@/components/meta/HtmlHead";
import type { TCategory, TConfig, TTag } from "@/types";

export type OfflineProps = {
  config: TConfig;
  categories: TCategory[];
  tags: TTag[];
};

export const Offline: React.FC<OfflineProps> = () => (
  <div className="grid place-items-center">
    <Head>
      <HtmlHeadNoIndex />
    </Head>
    <div className="mt-8 flex flex-col items-center justify-center gap-12" role="alert">
      <FaRegTired className="h-32 w-32 text-gray-500" />
      <div className="mx-auto flex flex-col gap-8 text-center">
        <h1>オフラインページ</h1>
        <p>インターネットに接続のうえ、ご利用ください</p>
      </div>
    </div>
  </div>
);
