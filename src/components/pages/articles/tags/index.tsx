import { HtmlHeadBase } from "@/components/functions/meta";
import { DefaultLayout } from "@/components/layouts";
import { ArticleSWRContainer } from "@/components/organisms/article";
import type { TArticleListResponse, TCategory, TConfig, TPickup, TRankedArticle, TTag } from "@/types";
import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { getBackLinks, urlTable } from "@/utils/paths/url";

export type TagsProps = {
  tag: TTag;
  categories: TCategory[];
  config: TConfig;
  data: TArticleListResponse;
  pickup: TPickup;
  popularArticles: TRankedArticle[];
  tags: TTag[];
};

export const Tags: React.FC<TagsProps> = ({ categories, config, data, pickup, popularArticles, tag, tags }) => {
  const { host, siteTitle } = config;
  const heading = `タグ：${tag.name}`;
  const pageTitle = formatPageTitle(heading, siteTitle);
  const url = formatPageUrl(`${urlTable.tags}/${tag.slug}`, host);
  const backLinks = getBackLinks([urlTable.home, urlTable.categories]);
  const queryOptions = { filters: `tags[contains]${tag.id}` };

  return (
    <DefaultLayout
      config={config}
      pageTitle={pageTitle}
      url={url}
      backLinks={backLinks}
      categories={categories}
      tags={tags}
      pickup={pickup}
      popularArticles={popularArticles}
    >
      <HtmlHeadBase indexUrl={host} pageTitle={pageTitle} url={url} />
      <div className="mb-8">
        <h1>{heading}</h1>
      </div>
      <div className="min-h-screen w-full">
        <ArticleSWRContainer fallbackData={data} queryOptions={queryOptions} />
      </div>
    </DefaultLayout>
  );
};
