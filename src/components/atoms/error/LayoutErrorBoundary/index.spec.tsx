import renderer from "react-test-renderer";

import { LayoutErrorBoundary } from ".";

describe("components/atoms/error/LayoutErrorBoundary", () => {
  it("snapshot", () => {
    const tree = renderer.create(<LayoutErrorBoundary>children</LayoutErrorBoundary>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
