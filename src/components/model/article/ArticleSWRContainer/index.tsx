"use client";

import type { MicroCMSQueries } from "microcms-js-sdk";

import Pagination from "@/components/feature/Pagination";
import { useSelectQueries } from "@/components/model/article/ArticleSWRContainer/useQueryOption";
import type { TArticleListResponse } from "@/types";

import { ArticleList } from "../ArticleList";
import { ArticleSkeltonList } from "../ArticleList/ArticleSkeltonList";
import useGetArticleListQuery from "./useGetArticleListQuery";

type ArticleSWRContainerProps = {
  fallbackData?: TArticleListResponse;
  queryOptions?: MicroCMSQueries;
};

export const ArticleSWRContainer: React.FC<ArticleSWRContainerProps> = ({ fallbackData, queryOptions }) => {
  const queries = useSelectQueries(queryOptions);
  const data = useGetArticleListQuery({
    fallbackData,
    queries,
  });
  const { articles, hasNextPage, isValidating, paginate } = data;
  const handlePaginate = paginate;

  if (!queries) return <div className="mt-16 flex justify-center">検索項目を入力してください</div>;

  if (isValidating && articles.length === 0) return <ArticleSkeltonList />;

  if (!isValidating && articles.length === 0)
    return <div className="mt-16 flex justify-center">レシピが見つかりませんでした</div>;

  return (
    <section>
      <ArticleList articles={articles} />
      <Pagination hasNextPage={hasNextPage} isValidating={isValidating} onClick={handlePaginate} />
    </section>
  );
};
