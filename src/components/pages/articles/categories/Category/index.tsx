import { HtmlHeadBase } from "@/components/functions/meta";
import { DefaultLayout } from "@/components/layouts";
import { ArticleSWRContainer } from "@/components/organisms/article";
import type { TArticleListResponse, TCategory, TConfig, TPickup, TRankedArticle, TTag } from "@/types";
import { formatPageTitle } from "@/utils/formatter";
import { getBackLinks, urlTable } from "@/utils/paths/url";

export type CategoryProps = {
  category: TCategory;
  categories: TCategory[];
  config: TConfig;
  data: TArticleListResponse;
  pickup: TPickup;
  popularArticles: TRankedArticle[];
  tags: TTag[];
};

export const Category: React.FC<CategoryProps> = ({
  data,
  category,
  config,
  categories,
  pickup,
  tags,
  popularArticles,
}) => {
  const { siteTitle, host } = config;
  const heading = `カテゴリー：${category.name}`;
  const pageTitle = formatPageTitle(heading, siteTitle);
  const url = new URL(`${urlTable.categories}/${category.slug}`, host).toString();
  const backLinks = getBackLinks([urlTable.home, urlTable.categories]);
  const queryOptions = { filters: `category[equals]${category.id}` };

  return (
    <DefaultLayout
      config={config}
      pageTitle={pageTitle}
      url={url}
      tags={tags}
      backLinks={backLinks}
      categories={categories}
      pickup={pickup}
      popularArticles={popularArticles}
    >
      <HtmlHeadBase indexUrl={host} pageTitle={pageTitle} url={url} image={category.image.url} />
      <div className="mb-8">
        <h1>{heading}</h1>
      </div>
      <div className="min-h-screen w-full">
        <ArticleSWRContainer fallbackData={data} queryOptions={queryOptions} />
      </div>
    </DefaultLayout>
  );
};
