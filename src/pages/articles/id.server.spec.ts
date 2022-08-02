// @jest-environment node

import { mockArticles } from "@mocks/data";
import { server } from "mocks/msw/server";

import { getStaticPaths } from "./[id].page";

beforeAll(() => server.listen());
afterAll(() => server.close());

describe.skip("pages/articles/[id]/server", () => {
  const mockArticleList = Object.values(mockArticles);

  it("getStaticPaths", async () => {
    const { paths, fallback } = await getStaticPaths({});
    expect(fallback).toBe("blocking");

    const expectedPaths = mockArticleList.map((article) => article.id);

    for (const path of paths) {
      if (typeof path === "string") return;
      expect(expectedPaths).toContain(path.params.slug);
    }
  });
});
