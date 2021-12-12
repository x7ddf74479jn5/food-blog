import { mockCategories } from "@mocks/data";
import userEvent from "@testing-library/user-event";
import { render, screen } from "jest/test-utils";
import React from "react";
import renderer from "react-test-renderer";

import { urlTable } from "@/utils/paths/url";

import { CategoryMenu } from ".";

describe("components/molecules/CategoryMenu", () => {
  const mockCategoryList = Object.values(mockCategories);

  it("snapshot", () => {
    const tree = renderer.create(<CategoryMenu categories={mockCategoryList} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("OK: 初期レンダリングが正しい", () => {
    render(<CategoryMenu categories={mockCategoryList} />);
    const button = screen.getByRole("button", { name: "カテゴリー" });
    expect(button).toHaveTextContent("カテゴリー");
    expect(button).toBeEnabled();
  });

  it.only("OK: メニュー展開後の表示が正しい", () => {
    render(<CategoryMenu categories={mockCategoryList} />);
    const button = screen.getByRole("button", { name: "カテゴリー" });
    expect(button).toBeEnabled();

    userEvent.click(button);
    const menuItems = screen.getAllByRole("menuitem");
    const labels = ["一覧", ...mockCategoryList.map((category) => category.name)];
    const hrefs = [
      urlTable.categories,
      ...mockCategoryList.map((category) => `${urlTable.categories}/${category.slug}`),
    ];

    menuItems.forEach((item, index) => {
      expect(item).toHaveTextContent(labels[index]);
      expect(item).toHaveAttribute("href", hrefs[index]);
    });
  });
});
