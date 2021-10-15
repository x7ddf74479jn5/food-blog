import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { TArticle, TCategory, TConfig, TPickup } from "src/types";

import HomeLayout from "@/components/layouts/HomeLayout";
import ArticleList from "@/components/molecules/ArticleList";
import { getNewDate } from "@/utils/date/getNewDate";
import { fetchArticles, fetchCategories, fetchConfig, fetchPickupArticles, fetchTags } from "@/utils/fetcher";
import { UrlTable } from "@/utils/paths/url";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home = ({ articles, config, pickup, categories }: Props) => {
  const url = UrlTable.home;
  const title = config.siteTitle;
  return (
    <HomeLayout pickup={pickup} url={url} pageTitle={title} config={config} categories={categories}>
      <h1 className="mb-4 text-4xl font-bold">レシピ一覧</h1>
      <ArticleList articles={articles} />
    </HomeLayout>
  );
};

type StaticProps = {
  articles: TArticle[];
  totalCount: number;
  categories: TCategory[];
  config: TConfig;
  pickup: TPickup;
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const [_config, _categories, _tags, data, pickup] = await Promise.all([
    fetchConfig(),
    fetchCategories(),
    fetchTags(),
    fetchArticles({ limit: 5, offset: 0 }),
    fetchPickupArticles(getNewDate()),
  ]);

  const { contents: articles, totalCount } = data;
  return {
    props: {
      articles,
      totalCount,
      categories: _categories,
      config: _config,
      pickup,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default Home;
