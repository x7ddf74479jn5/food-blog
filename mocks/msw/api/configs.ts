import { mockConfig } from "mocks/data";
import { getSearchParams } from "mocks/msw/api/utils";
import type { ResponseResolver, RestContext, RestRequest } from "msw";

export const mockGetConfig: ResponseResolver<RestRequest, RestContext> = async (req, res, ctx) => {
  const { apiKey } = getSearchParams(req);

  if (!apiKey) {
    res(ctx.status(400, "Invalid X_MICROCMS_API_KEY"));
  }

  return res(ctx.status(200), ctx.json(mockConfig));
};
