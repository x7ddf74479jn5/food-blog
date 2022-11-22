import { useRouter } from "next/router";
import { useCallback } from "react";

import { search as sendSearchEvent } from "@/lib/google-analytics/gtag";
import { toIdleTask } from "@/utils";
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

    if (q) {
      toIdleTask(() => sendSearchEvent({ term: q }));
    }
  }, [router, query, history, setHistory]);

  return {
    search,
  };
};
