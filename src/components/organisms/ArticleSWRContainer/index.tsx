import ArticleList from "@/components/molecules/ArticleList";
import { ArticleSkeltonList } from "@/components/molecules/ArticleSkeltonList";
import Pagination from "@/components/molecules/Pagination";
import { ErrorFallback } from "@/components/organisms/ErrorFallback";
import useGetArticleListQuery from "@/hooks/useGetArticleListQuery";
import type { TArticleListResponse, TQueryOptions } from "@/types";
import { apiRoute } from "@/utils/paths/url";

type ArticleSWRContainerProps = {
  queryOptions?: TQueryOptions;
  fallbackData?: TArticleListResponse;
};

export const ArticleSWRContainer: React.VFC<ArticleSWRContainerProps> = ({ queryOptions, fallbackData }) => {
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
