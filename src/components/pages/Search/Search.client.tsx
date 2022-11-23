"use client";

import type { MicroCMSQueries } from "microcms-js-sdk";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { DefaultLayout } from "@/components/layouts";
import { ArticleSWRContainer } from "@/components/model/article";
import type { TConfig } from "@/types";
import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { getBackLinks, urlTable } from "@/utils/paths/url";

const useSearchPage = (config: TConfig) => {
  const [heading, setHeading] = useState("");
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const { host, siteTitle } = config;
  const pageTitle = formatPageTitle(heading, siteTitle);
  const url = formatPageUrl(`${urlTable.search}/q=${q}`, host);

  useEffect(() => {
    setHeading(`検索結果：${q}`);
  }, [q]);

  return {
    heading,
    pageTitle,
    url,
  };
};

export const useQueryOption = () => {
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
  const queryOptions: MicroCMSQueries = { filters, q };

  return queryOptions;
};

type Props = {
  config: TConfig;
};
export const SearchClient: React.FC<Props> = ({ config }) => {
  const { heading, pageTitle, url } = useSearchPage(config);
  const queryOptions = useQueryOption();
  const backLinks = getBackLinks([urlTable.home, urlTable.categories]);

  return (
    <DefaultLayout pageTitle={pageTitle} url={url} backLinks={backLinks}>
      <h1 className="mb-8">{heading}</h1>
      <div className="w-full">
        <ArticleSWRContainer queryOptions={queryOptions} />
      </div>
    </DefaultLayout>
  );
};
