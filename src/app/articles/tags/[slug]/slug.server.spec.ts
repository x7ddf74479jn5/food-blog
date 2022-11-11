// @jest-environment node

import { mockTags } from "@mocks/data";
import { server } from "mocks/msw/server";

import { getStaticPaths } from "./page";

beforeAll(() => server.listen());
afterAll(() => server.close());

describe("pages/articles/tags/[slug]/server", () => {
  const mockTagList = Object.values(mockTags);

  it("getStaticPaths", async () => {
    const { fallback, paths } = await getStaticPaths({});
    expect(fallback).toBe("blocking");

    const expectedPaths = mockTagList.map((tag) => tag.slug);

    for (const path of paths) {
      if (typeof path === "string") return;
      expect(expectedPaths).toContain(path.params.slug);
    }
  });
});
