import type { GetStaticProps, InferGetStaticPropsType } from "next";
import NextLink from "next/link";
import type { ReactElement } from "react";
import { client } from "src/lib/client";
import type { TArticle, TArticleListResponse, TCategory, TConfig, TTag } from "src/types";

import DefaultLayout from "@/components/layouts/DefaultLayout";
import CustomImage from "@/components/mdx/CustomImage";
import { fetchCategories, fetchConfig, fetchTags } from "@/utils/fetcher";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home = ({ articles }: Props) => {
  return (
    <div>
      <h1 className="mb-4 text-4xl font-bold">レシピ一覧</h1>
      <div className="space-y-12">
        {articles.map((article) => (
          <div key={article.id}>
            <div className="mb-4">
              {/* <Thumbnail slug={article.slug} title={article.title} src={article.thumbnail} /> */}
              {/* <CustomImage src={article.image.url} width={article.image.width} height={article.image.height} /> */}
              {/* <CustomImage src={article.image.url} width={600} height={400} /> */}
              <CustomImage src={article.image.url} />
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

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
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
