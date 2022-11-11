import type { MicroCMSQueries } from "microcms-js-sdk";
import { useRouter } from "next/router";
import type { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";

import { HtmlHeadBase } from "@/components/functions/meta";
import { DefaultLayout } from "@/components/layouts";
import { ArticleSWRContainer } from "@/components/organisms/article";
import type { TCategory, TConfig, TPickup, TRankedArticle, TTag } from "@/types";
import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { getBackLinks, urlTable } from "@/utils/paths/url";

const useSearchPage = (config: TConfig, query: ParsedUrlQuery) => {
  const [heading, setHeading] = useState("");
  const router = useRouter();
  const q = query.q ? String(query.q) : "";
  const { host, siteTitle } = config;
  const pageTitle = formatPageTitle(heading, siteTitle);
  const url = formatPageUrl(`${urlTable.search}/q=${q ?? ""}`, host);

  useEffect(() => {
    if (router.isReady) {
      setHeading(`検索結果：${q ?? ""}`);
    }
  }, [q, router.isReady]);

  return {
    heading,
    pageTitle,
    url,
  };
};

export const useQueryOption = (query: ParsedUrlQuery) => {
  const queryFilters = [];

  const q = query.q ? String(query.q) : "";

  if (query.category) {
    const searchCategory = `categories[equals]${String(query.category)}`;
    queryFilters.push(searchCategory);
  }

  if (query.tags) {
    const searchTags = String(query.tags)
      .split(",")
      .map((tag) => `tags[contains]${tag}`)
      .join("[and]");
    queryFilters.push(searchTags);
  }

  const filters = queryFilters.length > 1 ? queryFilters.join("[and]") : queryFilters.join("");
  const queryOptions: MicroCMSQueries = { filters, q };

  return queryOptions;
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
  const { query } = useRouter();
  const { heading, pageTitle, url } = useSearchPage(config, query);
  const queryOptions = useQueryOption(query);
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
      <div className="mb-8">
        <h1>{heading}</h1>
      </div>
      <div className="w-full">
        <ArticleSWRContainer queryOptions={queryOptions} />
      </div>
    </DefaultLayout>
  );
};
