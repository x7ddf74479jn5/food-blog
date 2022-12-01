import { fireEvent, render, screen, within, withMockedRouter } from "jest/test-utils";
import { mockCategories } from "mocks/data";

import { urlTable } from "@/utils/paths/url";

import { CategoryMenu } from ".";

describe("components/molecules/category/CategoryMenu", () => {
  const mockCategoryList = Object.values(mockCategories);

  it("OK: 初期レンダリングが正しい", () => {
    render(withMockedRouter({ pathname: "/" }, <CategoryMenu categories={mockCategoryList} />));
    const button = screen.getByRole("button", { name: "カテゴリー" });
    expect(button).toHaveTextContent("カテゴリー");
    expect(button).toBeEnabled();
  });

  it("OK: メニュー展開後の表示が正しい", () => {
    render(withMockedRouter({ pathname: "/" }, <CategoryMenu categories={mockCategoryList} />));
    const button = screen.getByRole("button", { name: "カテゴリー" });
    expect(button).toBeEnabled();

    fireEvent.click(button);
    const menuItems = screen.getAllByRole("menuitem");
    const labels = ["一覧", "おすすめ", "人気", ...mockCategoryList.map((category) => category.name)];
    const hrefs = [
      urlTable.categories,
      urlTable.pickup,
      urlTable.popular,
      ...mockCategoryList.map((category) => `${urlTable.categories}/${category.slug}`),
    ];

    menuItems.forEach((item, index) => {
      expect(item).toHaveTextContent(labels[index]);
      const link = within(item).getByRole("link");
      expect(link).toHaveAttribute("href", hrefs[index]);
    });
  });
});
