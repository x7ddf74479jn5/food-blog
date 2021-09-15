// import NextLink from "next/link";
import NextLink from "@components/atoms/NextLink";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import type { TArticleListResponse } from "src/types";
import useSWRImmutable from "swr/immutable";

import Spinner from "@/components/atoms/Spinner";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import CustomImage from "@/components/mdx/CustomImage";

const Search = () => {
  const router = useRouter();

  const query = router.query.q;
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWRImmutable<TArticleListResponse, Error>(query ? `/api/search?q=${query}` : null, fetcher);

  const articles = data?.contents ?? [];

  return (
    <>
      <h1 className="mb-4 text-4xl font-bold">検索結果</h1>
      {!data ? (
        <Spinner />
      ) : articles?.length > 0 ? (
        <div className="space-y-12">
          {articles.map((article) => (
            <>
              <div className="mb-4" key={article.id}>
                {/* <Thumbnail slug={article.slug} title={article.title} src={article.thumbnail} /> */}
                {/* <CustomImage src={article.image.url} width={article.image.width} height={article.image.height} /> */}
                {/* <CustomImage src={article.image.url} width={600} height={400} /> */}
                <CustomImage src={article.image.url} />
              </div>

              <h2 className="mb-4 text-2xl font-bold">
                <NextLink href={`/articles/${article.id}`}>{article.title}</NextLink>
              </h2>

              <p className="dark:text-gray-300">{article.excerpt}</p>
            </>
          ))}
        </div>
      ) : (
        <p className="flex justify-center">レシピが見つかりませんでした</p>
      )}
    </>
  );
};

Search.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

// type StaticProps = {
//   articles: TArticle[];
//   totalCount: number;
//   categories: TCategory[];
//   tags: TTag[];
//   config: TConfig;
// };

// export const getStaticProps: GetStaticProps<StaticProps> = async () => {
//   const config = (await fetchConfig()) as TConfig;
//   const categories = (await fetchCategories()) as TCategory[];
//   const tags = (await fetchTags()) as TTag[];

//   const data = await client.get<TArticleListResponse>({ endpoint: "articles", queries: { limit: 10, offset: 0 } });

//   const { contents: articles, totalCount } = data;

//   return {
//     props: {
//       articles,
//       totalCount,
//       categories,
//       tags,
//       config,
//     },
//   };
// };

export default Search;
