import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useRouter } from "next/router";

import { HtmlHeadBase } from "@/components/atoms/meta";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { ArticleContainer } from "@/components/organisms/ArticleContainer/index";
import type { TCategory, TConfig, TPickup } from "@/types";
import { getNewDate } from "@/utils/date";
import { fetchCategories, fetchConfig, fetchPickupArticles } from "@/utils/fetcher";
import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { getBackLinks, UrlTable } from "@/utils/paths/url";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Search: NextPage<Props> = ({ config, categories, pickup }) => {
  const router = useRouter();
  const keyword = router.query.q;
  const { siteTitle, host } = config;
  const heading = `検索結果：${keyword}`;
  const pageTitle = formatPageTitle(heading, siteTitle);
  const url = formatPageUrl(`${UrlTable.search}/q=${keyword ?? ""}`, host);
  const backLinks = getBackLinks([UrlTable.home, UrlTable.categories]);

  return (
    <DefaultLayout
      config={config}
      pageTitle={pageTitle}
      url={url}
      backLinks={backLinks}
      categories={categories}
      pickup={pickup}
    >
      <HtmlHeadBase indexUrl={host} pageTitle={pageTitle} url={url} />
      <h1 className="mb-4 text-4xl font-bold">{heading}</h1>
      <div className="w-full min-h-screen">
        {keyword ? <ArticleContainer /> : <div className="flex justify-center mt-16">検索語句を入力してください。</div>}
      </div>
    </DefaultLayout>
  );
};

type StaticProps = {
  config: TConfig;
  categories: TCategory[];
  pickup: TPickup;
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const [config, _categories, pickup] = await Promise.all([
    fetchConfig(),
    fetchCategories(),
    fetchPickupArticles(getNewDate()),
  ]);

  return {
    props: {
      config,
      categories: _categories,
      pickup,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default Search;
