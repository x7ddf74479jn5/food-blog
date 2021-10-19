import renderer from "react-test-renderer";

import { HttpErrorBoundary } from ".";

describe("components/atoms/error/HttpErrorBoundary", () => {
  it("snapshot", () => {
    const tree = renderer.create(<HttpErrorBoundary>children</HttpErrorBoundary>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
