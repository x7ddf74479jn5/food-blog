import { render, screen, within } from "jest/test-utils";
import { mockCategories } from "mocks/data";

import { urlTable } from "@/utils/paths/url";

import { CategoryListSide } from ".";

describe("components/molecules/category/CategoryListSide", () => {
  const mockCategoryList = Object.values(mockCategories);

  it("OK: 表示が正しい", async () => {
    render(await CategoryListSide({ columns: "grid-cols-3 sm:grid-cols-5 md:grid-cols-1" }));

    const header = screen.getByRole("heading");
    expect(header).toHaveTextContent("カテゴリー");
    expect(screen.getByRole("link", { name: "カテゴリー" })).toHaveAttribute("href", urlTable.categories);

    const ul = screen.getByRole("list");
    const anchors = within(ul).getAllByRole("link");

    for (let i = 0; i < mockCategoryList.length; i++) {
      const anchor = anchors[i];
      const category = mockCategoryList[i];
      expect(anchor).toHaveAttribute("href", `${urlTable.categories}/${category.slug}`);
      expect(anchor).toHaveTextContent(category.name);
    }
  });
});
