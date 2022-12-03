import type { MicroCMSQueries } from "microcms-js-sdk";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { HtmlHeadBase } from "@/components/functions/meta";
import { DefaultLayout } from "@/components/layouts";
import { ArticleSWRContainer } from "@/components/organisms/article";
import type { TCategory, TConfig, TPickup, TRankedArticle, TTag } from "@/types";
import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { getBackLinks, urlTable } from "@/utils/paths/url";

const useSearchPage = (config: TConfig) => {
  const [heading, setHeading] = useState("");
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const { host, siteTitle } = config;
  const pageTitle = formatPageTitle(heading, siteTitle);
  const url = formatPageUrl(`${urlTable.search}/q=${q ?? ""}`, host);

  useEffect(() => {
    setHeading(`検索結果：${q ?? ""}`);
  }, [q]);

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
      <h1 className="mb-8">{heading}</h1>
      <div className="w-full">
        <ArticleSWRContainer queryOptions={queryOptions} />
      </div>
    </DefaultLayout>
  );
};
