import { Suspense, useState } from "react";

import { HttpErrorBoundary } from "@/components/atoms/error";
import ArticleList from "@/components/molecules/ArticleList";
import { ArticleSkeltonList } from "@/components/molecules/ArticleSkeltonList";
import Pagination from "@/components/molecules/Pagination";
import useGetArticleListQuery from "@/hooks/useGetArticleListQuery";
import type { TQueryOptions } from "@/types";
import { apiRoute } from "@/utils/paths/url";

type ArticleSuspenseContainerProps = {
  queryOptions?: TQueryOptions;
};

export const ArticleSuspenseContainer: React.VFC<ArticleSuspenseContainerProps> = ({ queryOptions }) => {
  const [callback, setCallback] = useState<VoidFunction | undefined>(undefined);

  return (
    <HttpErrorBoundary callback={callback}>
      <Suspense fallback={<ArticleSkeltonList />}>
        <Component setCallback={setCallback} queryOptions={queryOptions} />
      </Suspense>
    </HttpErrorBoundary>
  );
};

export default ArticleSuspenseContainer;

export const Component: React.VFC<{
  setCallback: React.Dispatch<React.SetStateAction<VoidFunction | undefined>>;
  queryOptions?: TQueryOptions;
}> = ({ setCallback, queryOptions }) => {
  const methods = useGetArticleListQuery({
    endpoint: apiRoute.apiArticles,
    // endpoint: apiRoute.apiSearch,
    getKeyOptions: queryOptions,
  });
  const { articles, hasNextPage, error, isValidating, paginate: handlePaginate, revalidate } = methods;

  setCallback(revalidate);

  if (error) return <div className="flex justify-center mt-16">エラーが発生しました。</div>;

  if (!isValidating && articles.length === 0)
    return <div className="flex justify-center mt-16">レシピが見つかりませんでした。</div>;

  return (
    <>
      <ArticleList articles={articles} />
      <Pagination hasNextPage={hasNextPage} isValidating={isValidating} onClick={handlePaginate} />
    </>
  );
};
