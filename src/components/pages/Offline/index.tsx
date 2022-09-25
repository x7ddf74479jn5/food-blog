import { FaRegTired } from "react-icons/fa";

import { HtmlHeadNoIndex } from "@/components/functions/meta";
import { RootLayout } from "@/components/layouts";
import type { TCategory, TConfig, TTag } from "@/types";

export type OfflineProps = {
  config: TConfig;
  categories: TCategory[];
  tags: TTag[];
};

export const Offline: React.FC<OfflineProps> = ({ config, categories, tags }) => (
  <RootLayout config={config} categories={categories} tags={tags}>
    <HtmlHeadNoIndex />
    <div className="mt-8 flex flex-col items-center justify-center gap-12" role="alert">
      <FaRegTired className="h-32 w-32 text-gray-500" />
      <div className="mx-auto flex flex-col gap-8 text-center">
        <h1>オフラインページ</h1>
        <p>インターネットに接続のうえ、ご利用ください</p>
      </div>
    </div>
  </RootLayout>
);
