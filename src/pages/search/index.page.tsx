import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useRouter } from "next/router";

import { fetchCategories, fetchConfig } from "@/api";
import { HtmlHeadBase } from "@/components/functions/meta";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { ArticleSWRContainer } from "@/components/organisms/ArticleSWRContainer";
import { getPickupArticles, getPopularArticles } from "@/services/article";
import type { TCategory, TConfig, TPickup, TQueryOptions, TRankedArticle } from "@/types";
import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { getBackLinks, urlTable } from "@/utils/paths/url";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Search: NextPage<Props> = ({ config, categories, pickup, popularArticles }) => {
  const router = useRouter();
  const q = router.query.q?.toString();
  const { siteTitle, host } = config;
  const heading = `検索結果：${q ?? ""}`;
  const pageTitle = formatPageTitle(heading, siteTitle);
  const url = formatPageUrl(`${urlTable.search}/q=${q ?? ""}`, host);
  const backLinks = getBackLinks([urlTable.home, urlTable.categories]);
  const queryOptions: TQueryOptions = { q };

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

type StaticProps = {
  config: TConfig;
  categories: TCategory[];
  pickup: TPickup;
  popularArticles: TRankedArticle[];
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const [config, categories, pickup, popularArticles] = await Promise.all([
    fetchConfig(),
    fetchCategories(),
    getPickupArticles(new Date()),
    getPopularArticles(),
  ]);

  return {
    props: {
      config,
      categories,
      pickup,
      popularArticles,
    },
  };
};

export default Search;
