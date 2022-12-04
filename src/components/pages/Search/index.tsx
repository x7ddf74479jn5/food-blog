import type { MicroCMSQueries } from "microcms-js-sdk";
import { useSearchParams } from "next/navigation";

import { HtmlHeadBase } from "@/components/functions/meta";
import { DefaultLayout } from "@/components/layouts";
import { ArticleSWRContainer } from "@/components/organisms/article";
import { useLastSearchHistory } from "@/components/organisms/SearchArea/useSearch";
import { SearchedQueryOptions } from "@/components/pages/Search/SearchResult";
import type { TCategory, TConfig, TPickup, TRankedArticle, TTag } from "@/types";
import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { getBackLinks, urlTable } from "@/utils/paths/url";

const useSearchPage = (config: TConfig) => {
  const lastSearchText = useLastSearchHistory();
  const heading = `検索結果：${lastSearchText ?? ""}`;
  const { host, siteTitle } = config;
  const pageTitle = formatPageTitle(heading, siteTitle);
  const url = formatPageUrl(`${urlTable.search}/q=${lastSearchText ?? ""}`, host);

  return {
    heading,
    pageTitle,
    url,
  };
};

export const useNewSearchQueries = (): MicroCMSQueries | undefined => {
  const queryFilters = [];
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const categoryParam = params.get("category");
  const tagsParam = params.get("tags");

  if (categoryParam) {
    const searchCategory = `categories[equals]${categoryParam}`;
    queryFilters.push(searchCategory);
  }

  if (tagsParam) {
    const searchTags = tagsParam
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
  const { heading, pageTitle, url } = useSearchPage(config);
  const queryOptions = useNewSearchQueries();
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
