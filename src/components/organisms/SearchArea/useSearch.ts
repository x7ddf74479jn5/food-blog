import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useCallback } from "react";
import z from "zod";

import { useSearchMutation, useSearchState } from "@/contexts/search/SearchContext";
import { search as sendSearchEvent } from "@/lib/google-analytics/gtag";
import { toIdleTask } from "@/utils";
import { urlTable } from "@/utils/paths/url";

const searchQueryParamsSchema = z.object({
  category: z.string().optional(),
  q: z.string().optional(),
  tags: z.string().optional(),
});

export type SearchQueryParams = z.infer<typeof searchQueryParamsSchema>;

export const useSearch = (query?: SearchQueryParams) => {
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

export const useGetSearchQueryParams = (): SearchQueryParams => {
  const params = useSearchParams();
  return searchQueryParamsSchema.parse(params);
};

export const useGetSearchQueryParamsLegacy = (): SearchQueryParams => {
  const { query } = useRouter();
  return searchQueryParamsSchema.parse(query);
};
