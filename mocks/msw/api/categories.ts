import { mockCategories } from "@mocks/data";
import type { ResponseResolver, RestContext, RestRequest } from "msw";

import type { TCategory } from "@/types";

import { findContentsBySlug, getSearchParams, isMatchedAgainstFilters } from "./utils";

export const mockGetCategories: ResponseResolver<RestRequest, RestContext> = async (req, res, ctx) => {
  const { apiKey, limit, offset, filters } = getSearchParams(req);

  if (!apiKey) {
    res(ctx.status(400, "Invalid X_MICROCMS_API_KEY "));
  }

  let categories: TCategory[] = [];

  if (filters) {
    const _filters = decodeURI(filters);
    const group = isMatchedAgainstFilters<TCategory>(_filters);
    if (!group) {
      return res(
        ctx.status(200),
        ctx.json({
          contents: categories,
          totalCount: categories.length,
          offset: offset,
          limit: limit,
        })
      );
    }

    categories = findContentsBySlug<TCategory>(mockCategories, group);

    return res(
      ctx.status(200),
      ctx.json({
        contents: categories,
        totalCount: categories.length,
        offset: offset,
        limit: limit,
      })
    );
  }

  categories = Object.values(mockCategories).slice(offset, limit);

  return res(
    ctx.status(200),
    ctx.json({
      contents: categories,
      totalCount: categories.length,
      offset: offset,
      limit: limit,
    })
  );
};
