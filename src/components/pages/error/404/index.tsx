import { HtmlHeadNoIndex } from "@/components/functions/meta";
import { RootLayout } from "@/components/layouts/RootLayout";
import { ErrorFallback } from "@/components/organisms/ErrorFallback";
import type { TCategory, TConfig } from "@/types";

export type Error404Props = {
  config: TConfig;
  categories: TCategory[];
};

export const Error404: React.FC<Error404Props> = ({ config, categories }) => (
  <RootLayout config={config} categories={categories}>
    <HtmlHeadNoIndex />
    <ErrorFallback heading="404 - Not Found" message="ページが見つかりませんでした" />
  </RootLayout>
);
