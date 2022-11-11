import { TwoColumnLayout } from "@/components/layouts";
import { CategoryList } from "@/components/molecules/category/CategoryList";
import type { TCategory, TConfig, TPickup, TRankedArticle, TTag } from "@/types";
import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { getBackLinks, urlTable } from "@/utils/paths/url";

export type CategoriesProps = {
  config: TConfig;
  categories: TCategory[];
  tags: TTag[];
  pickup: TPickup;
  popularArticles: TRankedArticle[];
};

export const Categories: React.FC<CategoriesProps> = ({ categories, config, pickup, popularArticles, tags }) => {
  const { host, siteTitle } = config;
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
      tags={tags}
      popularArticles={popularArticles}
    >
      <CategoryList categories={categories} width={128} height={128} />
    </TwoColumnLayout>
  );
};
