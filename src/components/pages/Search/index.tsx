import type { MicroCMSQueries } from "microcms-js-sdk";
import { useRouter } from "next/router";

import { HtmlHeadBase } from "@/components/functions/meta";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { ArticleSWRContainer } from "@/components/organisms/ArticleSWRContainer";
import type { TCategory, TConfig, TPickup, TRankedArticle } from "@/types";
import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { getBackLinks, urlTable } from "@/utils/paths/url";

export type SearchProps = {
  config: TConfig;
  categories: TCategory[];
  pickup: TPickup;
  popularArticles: TRankedArticle[];
};

export const Search: React.FC<SearchProps> = ({ config, categories, pickup, popularArticles }) => {
  const router = useRouter();
  const q = router.query.q?.toString();
  const { siteTitle, host } = config;
  const heading = `検索結果：${q ?? ""}`;
  const pageTitle = formatPageTitle(heading, siteTitle);
  const url = formatPageUrl(`${urlTable.search}/q=${q ?? ""}`, host);
  const backLinks = getBackLinks([urlTable.home, urlTable.categories]);
  const queryOptions: MicroCMSQueries = { q };

  return (
    <DefaultLayout
      config={config}
      pageTitle={pageTitle}
      url={url}
      backLinks={backLinks}
      categories={categories}
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
          <div className="mt-16 flex justify-center">検索語句を入力してください。</div>
        )}
      </div>
    </DefaultLayout>
  );
};
