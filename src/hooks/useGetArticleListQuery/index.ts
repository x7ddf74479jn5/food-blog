import { useCallback, useRef } from "react";
import { mutate } from "swr";
import type { SWRInfiniteConfiguration } from "swr/infinite";
import useSWRInfinite from "swr/infinite";

import type { Obj, TApiRoute, TArticleListResponse, TArticleSWRResponse, TQueryOptions } from "@/types";

const composeQueryString = (queries: Obj<string | number>) =>
  Object.entries(queries)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

type Arguments = {
  endpoint: TApiRoute;
  getKeyOptions?: TQueryOptions;
  fetcher?: (url?: string) => Promise<TArticleListResponse>;
  fallbackData?: TArticleListResponse[];
  options?: SWRInfiniteConfiguration;
};

const useGetArticleListQuery = ({ endpoint, fetcher, getKeyOptions, fallbackData, options }: Arguments) => {
  const keyRef = useRef("");
  const defaultLimit = 2;
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
    suspense: true,
    fallbackData,
    ...options,
  });

  const { size, setSize, data } = result;

  const getCurrentKey = useCallback(() => {
    return keyRef.current;
  }, [keyRef]);

  const revalidate = useCallback(() => {
    mutate(keyRef.current);
  }, [keyRef]);

  const paginate = useCallback(() => {
    setSize(size + 1);
  }, [setSize, size]);

  const articles = data ? data.map((r) => (r ? r.contents : [])).flat() : [];
  const totalCount = data ? data[0]?.totalCount : 0;
  const hasNextPage = totalCount ? articles.length !== totalCount : false;

  return { ...result, getCurrentKey, revalidate, paginate, hasNextPage, articles } as const;
};

export default useGetArticleListQuery;
