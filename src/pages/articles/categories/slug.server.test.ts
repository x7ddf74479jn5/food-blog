// @jest-environment node

import { mockCategories } from "@mocks/data";
import { server } from "mocks/msw/server";

import { getStaticPaths } from "./[slug].page";

beforeAll(() => server.listen());
afterAll(() => server.close());

describe("pages/articles/categories/[slug]/server", () => {
  const mockCategoryList = Object.values(mockCategories);

  it("getStaticPaths", async () => {
    const { paths, fallback } = await getStaticPaths({});
    expect(fallback).toBe("blocking");

    const expectedPaths = mockCategoryList.map((category) => category.slug);

    for (const path of paths) {
      if (typeof path === "string") return;
      expect(expectedPaths).toContain(path.params.slug);
    }
  });
});
