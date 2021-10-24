import { mockCategories } from "@mocks/data";
import React from "react";
import renderer from "react-test-renderer";

import { CategoryList } from "../CategoryList";

describe("components/molecules/CategoryList", () => {
  const mockCategoryList = Object.values(mockCategories);
  it("snapshot", () => {
    const tree = renderer.create(<CategoryList categories={mockCategoryList} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
