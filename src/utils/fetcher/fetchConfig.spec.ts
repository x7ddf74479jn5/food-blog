import { mockConfig } from "@mocks/data";
import { server } from "mocks/msw/server";

import { fetchConfig } from ".";

beforeAll(() => server.listen());
afterAll(() => server.close());

describe("utils/fetcher/fetchConfig", () => {
  describe("fetchConfig", () => {
    it("OK: 取得", async () => {
      const config = await fetchConfig();
      expect(config).toStrictEqual(mockConfig);
    });
  });
});
