import type { MicroCMSQueries } from "microcms-js-sdk";
import { useSearchParams } from "next/navigation";

import { usePath } from "@/hooks/usePath";
import { urlTable } from "@/utils/paths/url";

export const useNewSearchQueries = (): MicroCMSQueries | undefined => {
  const queryFilters = [];
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const categoryParam = params.get("category");
  const tagsParam = params.get("tags");

  if (categoryParam) {
    const searchCategory = `categories[equals]${categoryParam}`;
    queryFilters.push(searchCategory);
  }

  if (tagsParam) {
    const searchTags = tagsParam
      .split(",")
      .map((tag) => `tags[contains]${tag}`)
      .join("[and]");
    queryFilters.push(searchTags);
  }

  const filters = queryFilters.length > 1 ? queryFilters.join("[and]") : queryFilters.join("");
  if (!filters && !q) return;

  return { filters, q };
};

export const useSelectQueries = (initialQueries?: MicroCMSQueries): MicroCMSQueries | undefined => {
  const { matchPath } = usePath();
  const isNewSearch = matchPath(urlTable.search);
  const isPrerender = !!initialQueries;
  const newSearchQueries = useNewSearchQueries();
  const queries = isNewSearch ? newSearchQueries : isPrerender ? initialQueries : undefined;

  return queries;
};
