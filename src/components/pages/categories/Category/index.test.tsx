import { render, screen } from "jest/test-utils";
import { mockCategories, mockConfig } from "mocks/data";

import { formatPageTitle } from "@/utils/formatter";

import { Category } from ".";

describe("pages/categories/[slug]", () => {
  const mockCategoryRice = mockCategories.rice;

  it("OK: 初期レンダリング", async () => {
    render(await Category({ slug: mockCategoryRice.slug }));

    const h1 = screen.getByRole("heading", { level: 1 });
    const expectedHeading = `カテゴリー：${mockCategoryRice.name}`;
    expect(h1).toHaveTextContent(expectedHeading);
    const expectedTitle = formatPageTitle(expectedHeading, mockConfig.siteTitle);
    expect(document.title).toBe(expectedTitle);
  });
});
