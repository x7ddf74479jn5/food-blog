import type { MicroCMSQueries } from "microcms-js-sdk";
import { useCallback, useMemo, useRef } from "react";
import useSWRInfinite from "swr/infinite";

import type { TArticleListResponse, TArticleSWRResponse } from "@/types";
import { HttpError } from "@/utils/error/Http";
import { apiRoute } from "@/utils/paths/url";

const createURLSearchParams = (data: Record<string, string | number>) => {
  const params = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    const v = typeof value === "string" ? value : value.toString();
    params.append(key, v);
  });

  return params.toString();
};

type Arguments = {
  getKeyOptions?: Omit<MicroCMSQueries, "fields" | "ids">;
  fallbackData?: TArticleListResponse;
};

const useGetArticleListQuery = ({ fallbackData, getKeyOptions }: Arguments) => {
  const keyRef = useRef("");
  const endpoint = apiRoute.apiArticles;
  const defaultLimit = 10;
  const defaultKeyOptions = {
    limit: defaultLimit,
  };
  const defaultFetcher = (url: string): Promise<TArticleListResponse> =>
    fetch(url).then((res) => {
      if (!res.ok) {
        throw new HttpError(res);
      }
      return res.json();
    });

  const getKey = (pageIndex: number, previousPageData: TArticleSWRResponse) => {
    if (previousPageData && !previousPageData.contents) return null;

    if (pageIndex === 0) {
      const key = `${endpoint}?${createURLSearchParams({ ...defaultKeyOptions, ...getKeyOptions, pageIndex })}`;
      keyRef.current = key;

      return key;
    }

    const offset =
      previousPageData?.offset !== undefined ? previousPageData.offset + (getKeyOptions?.limit ?? defaultLimit) : 0;
    const key = `${endpoint}?${createURLSearchParams({ ...defaultKeyOptions, ...getKeyOptions, offset, pageIndex })}`;
    keyRef.current = key;

    return key;
  };

  const result = useSWRInfinite<TArticleSWRResponse, Error>(getKey, defaultFetcher, {
    fallbackData: fallbackData ? [fallbackData] : undefined,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const { data, mutate, setSize, size, ...rest } = result;

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
    return data?.flatMap((r) => r?.contents ?? []) ?? [];
  }, [data]);

  const totalCount = useMemo(() => {
    return data ? data[0]?.totalCount : 0;
  }, [data]);

  const hasNextPage = useMemo(() => {
    return totalCount ? articles.length !== totalCount : false;
  }, [articles.length, totalCount]);

  return { ...rest, articles, getCurrentKey, hasNextPage, paginate, revalidate } as const;
};

export default useGetArticleListQuery;
