import { useRouter } from "next/navigation";
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
    const params = new URLSearchParams({ ...query });

    router.push(`${urlTable.search}?${params.toString()}`);

    const q = query?.q;

    if (!q) return;

    if (history.includes(q)) {
      setHistory((prev) => {
        const newHistory = [q, ...prev.filter((h) => h !== q)].slice(0, 5);
        return newHistory;
      });
    } else {
      setHistory((prev) => [q, ...prev].slice(0, 5));
    }

    toIdleTask(() => sendSearchEvent({ term: q }));
  }, [router, query, history, setHistory]);

  return {
    search,
  };
};

export const useLastSearchHistory = () => {
  const { history } = useSearchState();
  return history.at(0);
};
