import { render, screen, within } from "jest/test-utils";
import { mockCategories } from "mocks/data";
import React from "react";
import renderer from "react-test-renderer";

import { urlTable } from "@/utils/paths/url";

import { CategoryListSide } from ".";

describe("components/molecules/CategoryMenu", () => {
  const mockCategoryList = Object.values(mockCategories);

  it("snapshot", () => {
    const tree = renderer.create(<CategoryListSide categories={mockCategoryList} columns={""} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("OK: 表示が正しい", () => {
    render(<CategoryListSide categories={mockCategoryList} columns={""} />);

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
