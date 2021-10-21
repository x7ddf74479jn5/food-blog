import { ErrorComponent } from "jest/test-utils";
import renderer from "react-test-renderer";

import { ErrorBoundaryBase } from ".";

describe("components/atoms/error/ErrorBoundaryBase", () => {
  it("snapshot", () => {
    const tree = renderer
      .create(
        <ErrorBoundaryBase>
          <ErrorComponent message="Error message" />
        </ErrorBoundaryBase>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
