import { useRouter } from "next/router";
import { useRef } from "react";
import { mutate } from "swr";
import type { SWRInfiniteConfiguration } from "swr/infinite";
import useSWRInfinite from "swr/infinite";

import type { TArticleSWRResponse } from "@/types";
import { UrlTable } from "@/utils/paths/url";

type Arguments = {
  perPage?: number;
  options?: SWRInfiniteConfiguration;
};

const useGetArticleListQuery = ({ perPage = 4, options }: Arguments) => {
  const router = useRouter();
  const q = router.query.q;
  const keyRef = useRef("");

  const getKey = (pageIndex: number, previousPageData: TArticleSWRResponse) => {
    let key;

    if (previousPageData && !previousPageData.contents) return null;

    if (pageIndex === 0) {
      key = `${UrlTable.apiSearch}?q=${q}&limit=${perPage}&pageIndex=${pageIndex}&previousPageData=${previousPageData}`;
      keyRef.current = key;

      return key;
    }

    const offset = previousPageData?.offset !== undefined ? previousPageData.offset + perPage : 0;
    key = `${UrlTable.apiSearch}?q=${q}&offset=${offset}&limit=${perPage}&pageIndex=${pageIndex}&previousPageData=${previousPageData}`;
    keyRef.current = key;

    return key;
  };

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const result = useSWRInfinite<TArticleSWRResponse, Error>(getKey, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    ...options,
  });

  const { size, setSize, data } = result;

  const getCurrentKey = () => {
    return keyRef.current;
  };

  const revalidate = () => {
    mutate(keyRef.current);
  };

  const paginate = () => {
    setSize(size + 1);
  };

  const articles = data ? data.map((r) => (r ? r.contents : [])).flat() : [];
  const totalCount = data ? data[0]?.totalCount : 0;
  const hasNextPage = totalCount ? articles.length !== totalCount : false;

  return { ...result, getCurrentKey, revalidate, paginate, hasNextPage, articles } as const;
};

export default useGetArticleListQuery;
