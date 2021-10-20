import { mockConfig } from "mocks/data";
import renderer from "react-test-renderer";

import { RootLayout } from ".";

describe("components/layouts/RootLayout", () => {
  it("snapshot", () => {
    const tree = renderer.create(<RootLayout config={mockConfig}>children</RootLayout>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
