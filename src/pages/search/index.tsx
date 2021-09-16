import NextLink from "@components/atoms/NextLink";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import type { TArticleListResponse } from "src/types";
import useSWRImmutable from "swr/immutable";

import Spinner from "@/components/atoms/Spinner";
import Thumbnail from "@/components/atoms/Thumbnail";
import DefaultLayout from "@/components/layouts/DefaultLayout";

const Search = () => {
  const router = useRouter();

  const { q, offset } = router.query;

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWRImmutable<TArticleListResponse, Error>(
    q ? `/api/search?q=${q}&offset=${offset ?? 0}` : null,
    fetcher
  );

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
                <Thumbnail src={article.image.url} title={article.title} id={article.id} />
              </div>

              <h2 className="mb-4 text-2xl font-bold">
                <NextLink href={`/articles/${article.id}`}>{article.title}</NextLink>
              </h2>

              <p className="dark:text-gray-300">{article.excerpt}</p>
            </>
          ))}
        </div>
      ) : (
        <div className="flex justify-center mt-4">レシピが見つかりませんでした</div>
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
