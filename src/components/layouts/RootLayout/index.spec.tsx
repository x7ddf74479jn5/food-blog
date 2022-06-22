import { mockCategories, mockConfig } from "mocks/data";
import renderer from "react-test-renderer";

import { RootLayout } from ".";

describe("components/layouts/RootLayout", () => {
  const categoryList = Object.values(mockCategories);
  it("snapshot", () => {
    const tree = renderer
      .create(
        <RootLayout categories={categoryList} config={mockConfig}>
          children
        </RootLayout>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
