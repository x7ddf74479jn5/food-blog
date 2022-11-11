import { mockTags } from "@mocks/data";
import { getSearchParams, isMatchedAgainstFilters } from "@mocks/msw/api/utils";
import type { ResponseResolver, RestContext, RestRequest } from "msw";

import type { TTag } from "@/types";

import { findContentsBySlug } from "./utils";

export const mockGetTags: ResponseResolver<RestRequest, RestContext> = async (req, res, ctx) => {
  const { apiKey, filters, limit, offset } = getSearchParams(req);

  if (!apiKey) {
    res(ctx.status(400, "Invalid X_MICROCMS_API_KEY"));
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
          limit: limit,
          offset: offset,
          totalCount: tags.length,
        })
      );
    }

    tags = findContentsBySlug<TTag>(mockTags, group);

    return res(
      ctx.status(200),
      ctx.json({
        contents: tags,
        limit: limit,
        offset: offset,
        totalCount: tags.length,
      })
    );
  }

  tags = Object.values(mockTags).slice(offset, limit);

  return res(
    ctx.status(200),
    ctx.json({
      contents: tags,
      limit: limit,
      offset: offset,
      totalCount: tags.length,
    })
  );
};
