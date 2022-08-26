import { TwoColumnLayout } from "@/components/layouts";
import { CategoryList } from "@/components/molecules/category/CategoryList";
import type { TCategory, TConfig, TPickup, TRankedArticle } from "@/types";
import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { getBackLinks, urlTable } from "@/utils/paths/url";

export type CategoriesProps = {
  config: TConfig;
  categories: TCategory[];
  pickup: TPickup;
  popularArticles: TRankedArticle[];
};

export const Categories: React.FC<CategoriesProps> = ({ config, categories, pickup, popularArticles }) => {
  const { siteTitle, host } = config;
  const heading = "カテゴリー一覧";
  const pageTitle = formatPageTitle(heading, siteTitle);
  const url = formatPageUrl(urlTable.categories, host);
  const backLinks = getBackLinks([urlTable.home]);
  return (
    <TwoColumnLayout
      config={config}
      pickup={pickup}
      host={host}
      url={url}
      title={pageTitle}
      backLinks={backLinks}
      heading={heading}
      categories={categories}
      popularArticles={popularArticles}
    >
      <CategoryList categories={categories} width={128} height={128} />
    </TwoColumnLayout>
  );
};
