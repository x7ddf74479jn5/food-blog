import { ErrorComponent } from "jest/test-utils";
import renderer from "react-test-renderer";

import { HttpErrorBoundary } from ".";

describe("components/atoms/error/HttpErrorBoundary", () => {
  console.error = jest.fn();

  it("snapshot", () => {
    const tree = renderer
      .create(
        <HttpErrorBoundary>
          <ErrorComponent />
        </HttpErrorBoundary>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
