import type { MicroCMSQueries } from "microcms-js-sdk";

import ArticleList from "@/components/molecules/article/ArticleList";
import { ArticleSkeltonList } from "@/components/molecules/article/ArticleSkeltonList";
import Pagination from "@/components/molecules/Pagination";
import { ErrorFallback } from "@/components/organisms/ErrorFallback";
import useGetArticleListQuery from "@/hooks/useGetArticleListQuery";
import type { TArticleListResponse } from "@/types";
import { apiRoute } from "@/utils/paths/url";

type ArticleSWRContainerProps = {
  queryOptions?: MicroCMSQueries;
  fallbackData?: TArticleListResponse;
};

export const ArticleSWRContainer: React.FC<ArticleSWRContainerProps> = ({ queryOptions, fallbackData }) => {
  const {
    articles,
    hasNextPage,
    isValidating,
    paginate: handlePaginate,
    revalidate: handleReset,
    error,
  } = useGetArticleListQuery({
    endpoint: apiRoute.apiArticles,
    getKeyOptions: queryOptions,
    fallbackData: fallbackData && fallbackData,
  });

  if (isValidating && articles.length === 0) return <ArticleSkeltonList />;

  if (error)
    return (
      <ErrorFallback heading="Something went wrong" message="サイト上で問題が発生しました。" onReset={handleReset} />
    );

  if (!isValidating && articles.length === 0)
    return <div className="mt-16 flex justify-center">レシピが見つかりませんでした。</div>;

  return (
    <section>
      <ArticleList articles={articles} />
      <Pagination hasNextPage={hasNextPage} isValidating={isValidating} onClick={handlePaginate} />
    </section>
  );
};
