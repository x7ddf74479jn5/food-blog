// import Head from "next/head";
import NextLink from "next/link";
import { client } from "src/lib/client";
import type { TArticle, TArticleListResponse, TCategory, TConfig, TTag } from "src/types";
import fetchCategories from "src/utils/fetchCategories";
import fetchConfig from "src/utils/fetchConfig";
import fetchTags from "src/utils/fetchTags";

import CustomImage from "@/components/mdx/CustomImage";

type Props = {
  articles: TArticle[];
  totalCount: number;
  categories: TCategory[];
  tags: TTag[];
  config: TConfig;
};

const Home: React.FC<Props> = ({ articles }: Props) => {
  return (
    <div>
      <h1 className="mb-4 text-4xl font-bold dark:text-red-100">レシピ一覧</h1>
      <div className="space-y-12">
        {articles.map((article) => (
          <div key={article.id}>
            <div className="mb-4">
              {/* <Thumbnail slug={article.slug} title={article.title} src={article.thumbnail} /> */}
              {/* <CustomImage src={article.image.url} width={article.image.width} height={article.image.height} /> */}
              <CustomImage src={article.image.url} width={600} height={400} />
              {/* <CustomImage src={article.image.url} /> */}
            </div>

            <h2 className="mb-4 text-2xl font-bold">
              <NextLink href={`/articles/${article.id}`}>{article.title}</NextLink>
            </h2>

            <p className="dark:text-gray-300">{article.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
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
