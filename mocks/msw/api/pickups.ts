import { mockPickup } from "@mocks/data";
import type { ResponseResolver, RestContext, RestRequest } from "msw";

import type { TPickupListResponse } from "@/types/models/pickup";

import { getSearchParams } from "./utils";

export const mockGetPickups: ResponseResolver<RestRequest, RestContext> = async (req, res, ctx) => {
  const { apiKey } = getSearchParams(req);

  if (!apiKey) {
    res(ctx.status(400, "Invalid X_MICROCMS_API_KEY"));
  }

  const resJson: TPickupListResponse = {
    contents: [mockPickup],
    limit: 1,
    offset: 0,
    totalCount: 1,
  };

  return res(ctx.status(200), ctx.json(resJson));
};
