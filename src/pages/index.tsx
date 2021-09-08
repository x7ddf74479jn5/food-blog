import { client } from "lib/client";
// import Head from "next/head";
// import NextLink from "next/link";
import type { TArticle, TArticleListResponse, TCategory, TConfig, TTag } from "src/types";
import fetchCategories from "src/utils/fetchCategories";
import fetchConfig from "src/utils/fetchConfig";
import fetchTags from "src/utils/fetchTags";

type Props = {
  articles: TArticle[];
  totalCount: number;
  categories: TCategory[];
  tags: TTag[];
  config: TConfig;
};

const Home: React.FC<Props> = ({ articles }: Props) => {
  return <div>{articles}</div>;
};

export const getStaticProps = async () => {
  const config = await fetchConfig();
  const categories = await fetchCategories();
  const tags = await fetchTags();

  const data = await client.get<TArticleListResponse>({ endpoint: "articles", queries: { limit: 10, offset: 0 } });

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
