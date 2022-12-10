import type { MicroCMSQueries } from "microcms-js-sdk";

import { HtmlHeadBase } from "@/components/functions/meta";
import { DefaultLayout } from "@/components/layouts";
import { ArticleSWRContainer } from "@/components/organisms/article";
import type { SearchQueryParams } from "@/components/organisms/SearchArea/useSearch";
import { useGetSearchQueryParamsLegacy } from "@/components/organisms/SearchArea/useSearch";
import { SearchedQueryOptions } from "@/components/pages/Search/SearchResult";
import type { TCategory, TConfig, TPickup, TRankedArticle, TTag } from "@/types";
import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { getBackLinks, urlTable } from "@/utils/paths/url";

const useSearchPage = (config: TConfig, params: SearchQueryParams) => {
  const { q } = params;
  const heading = `検索結果：${q ?? ""}`;
  const { host, siteTitle } = config;
  const pageTitle = formatPageTitle(heading, siteTitle);
  const url = formatPageUrl(`${urlTable.search}/q=${q ?? ""}`, host);

  return {
    heading,
    pageTitle,
    url,
  };
};

export const useNewSearchQueries = (params: SearchQueryParams): MicroCMSQueries | undefined => {
  const queryFilters = [];
  const { category, q, tags } = params;
  if (category) {
    const searchCategory = `category[equals]${category}`;
    queryFilters.push(searchCategory);
  }

  if (tags) {
    const searchTags = tags
      .split(",")
      .map((tag) => `tags[contains]${tag}`)
      .join("[and]");
    queryFilters.push(searchTags);
  }

  const filters = queryFilters.length > 1 ? queryFilters.join("[and]") : queryFilters.join("");

  if (!filters && !q) return;

  return { filters, q };
};

export type SearchProps = {
  config: TConfig;
  categories: TCategory[];
  tags: TTag[];
  pickup: TPickup;
  popularArticles: TRankedArticle[];
};

export const Search: React.FC<SearchProps> = ({ categories, config, pickup, popularArticles, tags }) => {
  const { host } = config;
  const params = useGetSearchQueryParamsLegacy();
  const { heading, pageTitle, url } = useSearchPage(config, params);
  const queryOptions = useNewSearchQueries(params);
  const backLinks = getBackLinks([urlTable.home, urlTable.categories]);

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
      <div className="mb-8 flex flex-col space-y-4">
        <h1>{heading}</h1>
        <SearchedQueryOptions />
      </div>
      <div className="w-full">
        <ArticleSWRContainer queryOptions={queryOptions} />
      </div>
    </DefaultLayout>
  );
};
