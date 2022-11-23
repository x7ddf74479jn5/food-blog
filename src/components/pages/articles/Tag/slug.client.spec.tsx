import { render, screen } from "jest/test-utils";
import { mockConfig, mockTags } from "mocks/data";

import { formatPageTitle } from "@/utils/formatter";

import { Tag } from ".";

describe("pages/articles/tags/[slug]/client", () => {
  const mockTagRice = mockTags.rice;

  it("OK: 初期レンダリング", async () => {
    render(await Tag({ slug: mockTagRice.slug }));
    const h1 = screen.getByRole("heading", { level: 1 });
    const expectedHeading = `タグ：${mockTagRice.name}`;
    expect(h1).toHaveTextContent(expectedHeading);
    const expectedTitle = formatPageTitle(expectedHeading, mockConfig.siteTitle);
    expect(document.title).toBe(expectedTitle);
  });
});
