import type { MicroCMSQueries } from "microcms-js-sdk";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { HtmlHeadBase } from "@/components/functions/meta";
import { DefaultLayout } from "@/components/layouts";
import { ArticleSWRContainer } from "@/components/organisms/article";
import type { TCategory, TConfig, TPickup, TRankedArticle, TTag } from "@/types";
import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { getBackLinks, urlTable } from "@/utils/paths/url";

export type SearchProps = {
  config: TConfig;
  categories: TCategory[];
  tags: TTag[];

  pickup: TPickup;
  popularArticles: TRankedArticle[];
};

export const Search: React.FC<SearchProps> = ({ config, categories, pickup, popularArticles, tags }) => {
  const [heading, setHeading] = useState("");
  const [fallbackText, setFallbackText] = useState("");
  const router = useRouter();
  const q = router.query.q ? String(router.query.q) : "";
  const { siteTitle, host } = config;
  const pageTitle = formatPageTitle(heading, siteTitle);
  const url = formatPageUrl(`${urlTable.search}/q=${q ?? ""}`, host);
  const backLinks = getBackLinks([urlTable.home, urlTable.categories]);
  const queryOptions: MicroCMSQueries = { q };

  useEffect(() => {
    if (router.isReady) {
      setHeading(`検索結果：${q ?? ""}`);
      setFallbackText("検索語句を入力してください");
    }
  }, [q, router.isReady]);

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
        {q ? (
          <ArticleSWRContainer queryOptions={queryOptions} />
        ) : (
          <div className="mt-16 flex justify-center">{fallbackText}</div>
        )}
      </div>
    </DefaultLayout>
  );
};
