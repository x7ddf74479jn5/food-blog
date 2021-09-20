import { useRouter } from "next/router";
import type { SWRInfiniteConfiguration } from "swr/infinite";
import useSWRInfinite from "swr/infinite";

import type { TArticleSWRResponse } from "@/types";

type Arguments = {
  perPage?: number;
  options?: SWRInfiniteConfiguration;
};

const useGetArticleListQuery = ({ perPage = 4, options }: Arguments) => {
  const router = useRouter();
  const q = router.query.q;

  const getKey = (pageIndex: number, previousPageData: TArticleSWRResponse) => {
    if (previousPageData && !previousPageData.contents) return null;
    if (pageIndex === 0)
      return `/api/search?q=${q}&limit=${perPage}&pageIndex=${pageIndex}&previousPageData=${previousPageData}`;
    const offset = previousPageData?.offset !== undefined ? previousPageData.offset + perPage : 0;
    return `/api/search?q=${q}&offset=${offset}&limit=${perPage}&pageIndex=${pageIndex}&previousPageData=${previousPageData}`;
  };

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  return useSWRInfinite<TArticleSWRResponse, Error>(getKey, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    ...options,
  });
};

export default useGetArticleListQuery;
