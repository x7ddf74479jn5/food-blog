import { useRouter } from "next/router";
import { useCallback } from "react";

import { urlTable } from "@/utils/paths/url";

import { useSearchMutation, useSearchState } from "./SearchContext";

export const useSearch = (query?: { q: string; category?: string; tags?: string }) => {
  const router = useRouter();
  const { history } = useSearchState();
  const { setHistory } = useSearchMutation();

  const search = useCallback(() => {
    router.push(
      {
        pathname: urlTable.search,
        query: { ...query },
      },
      undefined,
      { shallow: true }
    );

    const q = query?.q;

    if (q && !history.includes(q)) {
      setHistory((prev) => [q, ...prev].slice(0, 5));
    }
  }, [router, query, history, setHistory]);

  return {
    search,
  };
};
