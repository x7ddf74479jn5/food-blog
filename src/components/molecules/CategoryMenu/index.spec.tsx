import { render, screen } from "jest/test-utils";
import { mockCategories } from "mocks/data";
import React from "react";
import renderer from "react-test-renderer";

import { UrlTable } from "@/utils/paths/url";

import { CategoryMenu } from ".";

describe("components/molecules/CategoryMenu", () => {
  const mockCategoryList = Object.values(mockCategories);

  it("snapshot", () => {
    const tree = renderer.create(<CategoryMenu categories={mockCategoryList} columns={""} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("OK: 表示が正しい", () => {
    render(<CategoryMenu categories={mockCategoryList} columns={""} />);

    const header = screen.getByRole("heading");
    expect(header).toHaveTextContent("カテゴリー");

    const anchors = screen.getAllByRole("link");

    for (let i = 0; i < mockCategoryList.length; i++) {
      const anchor = anchors[i];
      const category = mockCategoryList[i];
      expect(anchor).toHaveAttribute("href", `${UrlTable.categories}/${category.slug}`);
      expect(anchor).toHaveTextContent(category.name);
    }
  });
});
