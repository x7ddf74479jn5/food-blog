import { Suspense } from "react";

import { HttpErrorBoundary } from "@/components/atoms/error";
import ArticleList from "@/components/molecules/ArticleList";
import { ArticleSkeltonList } from "@/components/molecules/ArticleSkeltonList";
import Pagination from "@/components/molecules/Pagination";
import useGetArticleListQuery from "@/hooks/useGetArticleListQuery";

export const ArticleContainer: React.VFC = () => {
  const methods = useGetArticleListQuery({
    perPage: 4,
    options: { suspense: true },
  });

  return (
    <HttpErrorBoundary callback={methods.revalidate}>
      <Suspense fallback={<ArticleSkeltonList />}>
        <Component methods={methods} />
      </Suspense>
    </HttpErrorBoundary>
  );
};

export default ArticleContainer;

export const Component: React.VFC<{ methods: ReturnType<typeof useGetArticleListQuery> }> = ({ methods }) => {
  const { articles, hasNextPage, error, isValidating, paginate: handlePaginate } = methods;

  if (error) return <div className="flex justify-center mt-16">エラーが発生しました。</div>;

  if (articles.length === 0) return <div className="flex justify-center mt-16">レシピが見つかりませんでした。</div>;

  return (
    <>
      <ArticleList articles={articles} />
      <Pagination hasNextPage={hasNextPage} isValidating={isValidating} onClick={handlePaginate} />
    </>
  );
};
