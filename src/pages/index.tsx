import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { client } from "src/lib/client";
import type { TArticle, TArticleListResponse, TCategory, TConfig, TTag } from "src/types";

import DefaultLayout from "@/components/layouts/DefaultLayout";
import ArticleList from "@/components/molecules/ArticleList";
import { fetchCategories, fetchConfig, fetchTags } from "@/utils/fetcher";

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
  const config = (await fetchConfig()) as TConfig;
  const categories = (await fetchCategories()) as TCategory[];
  const tags = (await fetchTags()) as TTag[];

  const data = await client.get<TArticleListResponse>({ endpoint: "articles", queries: { limit: 5, offset: 0 } });

  const { contents: articles, totalCount } = data;

  return {
    props: {
      articles,
      totalCount,
      categories,
      tags,
      config,
    },
  };
};

export default Home;
