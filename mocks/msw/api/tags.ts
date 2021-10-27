import { mockTags } from "@mocks/data";
import { getSearchParams, isMatchedAgainstFilters } from "@mocks/msw/api/utils";
import type { ResponseResolver, RestContext, RestRequest } from "msw";

import type { TTag } from "@/types";

import { findContentsBySlug } from "./utils";

export const mockGetTags: ResponseResolver<RestRequest, RestContext> = async (req, res, ctx) => {
  const { apiKey, limit, offset, filters } = getSearchParams(req);

  if (!apiKey) {
    res(ctx.status(400, "Invalid X_MICROCMS_API_KEY "));
  }

  let tags: TTag[] = [];

  if (filters) {
    const _filters = decodeURI(filters);
    const group = isMatchedAgainstFilters<TTag>(_filters);
    if (!group) {
      return res(
        ctx.status(200),
        ctx.json({
          contents: tags,
          totalCount: tags.length,
          offset: offset,
          limit: limit,
        })
      );
    }

    tags = findContentsBySlug<TTag>(mockTags, group);

    return res(
      ctx.status(200),
      ctx.json({
        contents: tags,
        totalCount: tags.length,
        offset: offset,
        limit: limit,
      })
    );
  }

  tags = Object.values(mockTags).slice(offset, limit);

  return res(
    ctx.status(200),
    ctx.json({
      contents: tags,
      totalCount: tags.length,
      offset: offset,
      limit: limit,
    })
  );
};
