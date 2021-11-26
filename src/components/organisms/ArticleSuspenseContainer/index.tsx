import { Suspense, useCallback, useRef } from "react";

import { HttpErrorBoundary } from "@/components/functions/error";
import ArticleList from "@/components/molecules/ArticleList";
import { ArticleSkeltonList } from "@/components/molecules/ArticleSkeltonList";
import Pagination from "@/components/molecules/Pagination";
import useGetArticleListQuery from "@/hooks/useGetArticleListQuery";
import type { TArticleListResponse, TQueryOptions } from "@/types";
import { apiRoute } from "@/utils/paths/url";

type ArticleSuspenseContainerProps = {
  queryOptions?: TQueryOptions;
  fallbackData?: TArticleListResponse;
};

export const ArticleSuspenseContainer: React.VFC<ArticleSuspenseContainerProps> = ({ queryOptions, fallbackData }) => {
  const callbackRef = useRef<VoidFunction | undefined>(undefined);
  const setCallback = useCallback((cb) => {
    callbackRef.current = cb;
  }, []);

  return (
    <HttpErrorBoundary callback={callbackRef.current}>
      <Suspense fallback={<ArticleSkeltonList />}>
        <Component setCallback={setCallback} queryOptions={queryOptions} fallbackData={fallbackData} />
      </Suspense>
    </HttpErrorBoundary>
  );
};

export default ArticleSuspenseContainer;

export const Component: React.VFC<{
  setCallback: React.Dispatch<React.SetStateAction<VoidFunction | undefined>>;
  queryOptions?: TQueryOptions;
  fallbackData?: TArticleListResponse;
}> = ({ setCallback, queryOptions, fallbackData }) => {
  const {
    articles,
    hasNextPage,
    isValidating,
    paginate: handlePaginate,
    revalidate,
  } = useGetArticleListQuery({
    endpoint: apiRoute.apiArticles,
    getKeyOptions: queryOptions,
    fallbackData: fallbackData && fallbackData,
  });

  setCallback(revalidate);

  if (!isValidating && articles.length === 0)
    return <div className="flex justify-center mt-16">レシピが見つかりませんでした。</div>;

  return (
    <section>
      <ArticleList articles={articles} />
      <Pagination hasNextPage={hasNextPage} isValidating={isValidating} onClick={handlePaginate} />
    </section>
  );
};
