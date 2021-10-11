import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { TArticle, TCategory, TConfig, TTag } from "src/types";

import DefaultLayout from "@/components/layouts/DefaultLayout";
import ArticleList from "@/components/molecules/ArticleList";
import { fetchArticles, fetchCategories, fetchConfig, fetchTags } from "@/utils/fetcher";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home = ({ articles, config }: Props) => {
  return (
    <DefaultLayout config={config}>
      <h1 className="mb-4 text-4xl font-bold">レシピ一覧</h1>
      <ArticleList articles={articles} />
    </DefaultLayout>
  );
};

type StaticProps = {
  articles: TArticle[];
  totalCount: number;
  categories: TCategory[];
  tags: TTag[];
  config: TConfig;
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const [_config, _categories, _tags, data] = await Promise.all([
    fetchConfig(),
    fetchCategories(),
    fetchTags(),
    fetchArticles({ limit: 5, offset: 0 }),
  ]);

  const { contents: articles, totalCount } = data;

  return {
    props: {
      articles,
      totalCount,
      categories: _categories as TCategory[],
      tags: _tags as TTag[],
      config: _config as TConfig,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default Home;
