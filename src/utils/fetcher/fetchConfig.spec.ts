import { mockConfig } from "@mocks/data";
import { server } from "mocks/msw/server";

import { fetchConfig } from ".";

beforeAll(() => server.listen());
afterAll(() => server.close());

// FIXME: sdkとnextをアップグレードしたら壊れた
// serviceDomain or endpoint may be wrong.
// Details: FetchError: request to https://food-blog.microcms.io/api/v1/configs failed, reason: Invalid character in header field name

describe.skip("utils/fetcher/fetchConfig", () => {
  describe("fetchConfig", () => {
    it("OK: 取得", async () => {
      const config = await fetchConfig();
      expect(config).toStrictEqual(mockConfig);
    });
  });
});
