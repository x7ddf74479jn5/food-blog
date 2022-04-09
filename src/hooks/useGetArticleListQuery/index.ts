import { useCallback, useMemo, useRef } from "react";
import type { SWRInfiniteConfiguration } from "swr/infinite";
import useSWRInfinite from "swr/infinite";

import type { TApiRoute, TArticleListResponse, TArticleSWRResponse, TQueryOptions } from "@/types";

const composeQueryString = (queries: Record<string, string | number>) =>
  Object.entries(queries)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

type Arguments = {
  endpoint: TApiRoute;
  getKeyOptions?: TQueryOptions;
  fetcher?: (url?: string) => Promise<TArticleListResponse>;
  fallbackData?: TArticleListResponse;
  options?: SWRInfiniteConfiguration;
};

const useGetArticleListQuery = ({ endpoint, fetcher, getKeyOptions, fallbackData, options }: Arguments) => {
  const keyRef = useRef("");
  const defaultLimit = 10;
  const defaultKeyOptions = {
    limit: defaultLimit,
  };
  const defaultFetcher = (url: string): Promise<TArticleListResponse> => fetch(url).then((res) => res.json());

  const getKey = (pageIndex: number, previousPageData: TArticleSWRResponse) => {
    if (previousPageData && !previousPageData.contents) return null;

    if (pageIndex === 0) {
      const key = `${endpoint}?${composeQueryString({ ...defaultKeyOptions, ...getKeyOptions, pageIndex })}`;
      keyRef.current = key;

      return key;
    }

    const offset =
      previousPageData?.offset !== undefined ? previousPageData.offset + (getKeyOptions?.limit ?? defaultLimit) : 0;
    const key = `${endpoint}?${composeQueryString({ ...defaultKeyOptions, ...getKeyOptions, offset, pageIndex })}`;
    keyRef.current = key;

    return key;
  };

  const result = useSWRInfinite<TArticleSWRResponse, Error>(getKey, fetcher ?? defaultFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    fallbackData: fallbackData ? [fallbackData] : undefined,
    ...options,
  });

  const { size, setSize, mutate, data, ...rest } = result;

  const getCurrentKey = useCallback(() => {
    return keyRef.current;
  }, [keyRef]);

  const revalidate = useCallback(() => {
    mutate();
  }, [mutate]);

  const paginate = useCallback(() => {
    setSize(size + 1);
  }, [setSize, size]);

  const articles = useMemo(() => {
    return data ? data.map((r) => (r ? r.contents : [])).flat() : [];
  }, [data]);

  const totalCount = useMemo(() => {
    return data ? data[0]?.totalCount : 0;
  }, [data]);

  const hasNextPage = useMemo(() => {
    return totalCount ? articles.length !== totalCount : false;
  }, [articles.length, totalCount]);

  return { ...rest, getCurrentKey, revalidate, paginate, hasNextPage, articles } as const;
};

export default useGetArticleListQuery;
