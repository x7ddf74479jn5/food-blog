import type { MicroCMSQueries } from "microcms-js-sdk";

import { ArticleList, ArticleSkeltonList } from "@/components/molecules/article";
import Pagination from "@/components/molecules/Pagination";
import { ErrorFallback } from "@/components/organisms/ErrorFallback";
import type { TArticleListResponse } from "@/types";

import useGetArticleListQuery from "./useGetArticleListQuery";

type ArticleSWRContainerProps = {
  queryOptions?: MicroCMSQueries;
  fallbackData?: TArticleListResponse;
};

export const ArticleSWRContainer: React.FC<ArticleSWRContainerProps> = ({ fallbackData, queryOptions }) => {
  const {
    articles,
    error,
    hasNextPage,
    isLoading,
    isValidating,
    paginate: handlePaginate,
    revalidate: handleReset,
  } = useGetArticleListQuery({
    fallbackData: fallbackData,
    getKeyOptions: queryOptions,
  });

  /* fallbackDataはloadされたデータと見なされない */
  if (isLoading && !fallbackData) return <ArticleSkeltonList />;

  if (error)
    return (
      <ErrorFallback heading="Something went wrong" message="サイト上で問題が発生しました" onReset={handleReset} />
    );

  if (articles.length === 0) return <div className="mt-16 flex justify-center">レシピが見つかりませんでした</div>;

  return (
    <section>
      <ArticleList articles={articles} />
      <Pagination hasNextPage={hasNextPage} isValidating={isValidating} onClick={handlePaginate} />
    </section>
  );
};
