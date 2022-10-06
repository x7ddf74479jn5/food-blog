import { HtmlHeadNoIndex } from "@/components/functions/meta";
import { RootLayout } from "@/components/layouts";
import { ErrorFallback } from "@/components/organisms/ErrorFallback";
import type { TCategory, TConfig, TTag } from "@/types";

export type Error404Props = {
  config: TConfig;
  categories: TCategory[];
  tags: TTag[];
};

export const Error404: React.FC<Error404Props> = ({ config, categories, tags }) => (
  <RootLayout config={config} categories={categories} tags={tags}>
    <HtmlHeadNoIndex />
    <ErrorFallback heading="404 - Not Found" message="ページが見つかりませんでした" />
  </RootLayout>
);
