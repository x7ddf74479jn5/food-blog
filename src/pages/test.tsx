// import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
// import { useRouter } from "next/router";
// import type { TArticleListResponse, TConfig } from "src/types";
// import useSWRInfinite from "swr/infinite";

// import Spinner from "@/components/atoms/Spinner";
// import DefaultLayout from "@/components/layouts/DefaultLayout";
// import ArticleList from "@/components/molecules/ArticleList";
// import { fetchConfig } from "@/utils/fetcher";

// type Props = InferGetStaticPropsType<typeof getStaticProps>;

// const Search: NextPage<Props> = ({ config }) => {
//   const router = useRouter();

//   const { q, offset } = router.query;

//   const getKey = (pageIndex: number, previousPageData: TArticleListResponse) => {
//     // 最後に到達した
//     if (previousPageData && !previousPageData.contents) return null;

//     // 最初のページでは、`previousPageData` がありません
//     if (pageIndex === 0) return `/api/search?limit=1`;

//     // API のエンドポイントにカーソルを追加します
//     return `/api/search?offset=${previousPageData.offset}&limit=1`;
//   };
//   const fetcher = (url: string) => fetch(url).then((res) => res.json());
//   const { data } = useSWRInfinite((pageIndex: number, previousPageData: TArticleListResponse) => {
//     // 最後に到達した
//     if (previousPageData && !previousPageData.contents) return null;

//     // 最初のページでは、`previousPageData` がありません
//     if (pageIndex === 0) return `/api/search?limit=1`;

//     // API のエンドポイントにカーソルを追加します
//     return `/api/search?offset=${previousPageData.offset}&limit=1`;
//   }, fetcher);

//   const articles = data?.map((data) => data.contents);

//   return (
//     <DefaultLayout config={config}>
//       <h1 className="mb-4 text-4xl font-bold">検索結果</h1>
//       {!data ? (
//         <Spinner />
//       ) : articles?.length > 0 ? (
//         <ArticleList articles={articles} />
//       ) : (
//         <div className="flex justify-center mt-4">レシピが見つかりませんでした</div>
//       )}
//     </DefaultLayout>
//   );
// };

// type StaticProps = {
//   config: TConfig;
// };

// export const getStaticProps: GetStaticProps<StaticProps> = async () => {
//   const config = (await fetchConfig()) as TConfig;

//   return {
//     props: {
//       config,
//     },
//   };
// };

// export default Search;
