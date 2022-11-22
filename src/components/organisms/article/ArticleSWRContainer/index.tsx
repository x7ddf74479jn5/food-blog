"use client";

import type { MicroCMSQueries } from "microcms-js-sdk";

import Pagination from "@/components/molecules/Pagination";
import type { TArticleListResponse } from "@/types";
import { apiRoute } from "@/utils/paths/url";

import { ArticleList } from "./ArticleList";
import { ArticleSkeltonList } from "./ArticleSkeltonList";
import useGetArticleListQuery from "./useGetArticleListQuery";

type ArticleSWRContainerProps = {
  queryOptions?: MicroCMSQueries;
  fallbackData?: TArticleListResponse;
};

export const ArticleSWRContainer: React.FC<ArticleSWRContainerProps> = ({ fallbackData, queryOptions }) => {
  const {
    articles,
    hasNextPage,
    isValidating,
    paginate: handlePaginate,
  } = useGetArticleListQuery({
    endpoint: apiRoute.apiArticles,
    fallbackData,
    getKeyOptions: queryOptions,
  });

  if (isValidating && articles.length === 0) return <ArticleSkeltonList />;

  if (!isValidating && articles.length === 0)
    return <div className="mt-16 flex justify-center">レシピが見つかりませんでした。</div>;

  return (
    <section>
      <ArticleList articles={articles} />
      <Pagination hasNextPage={hasNextPage} isValidating={isValidating} onClick={handlePaginate} />
    </section>
  );
};
