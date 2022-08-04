import renderer from "react-test-renderer";

import Spinner from ".";

describe("components/atoms/Spinner", () => {
  it("snapshot", () => {
    const tree = renderer.create(<Spinner size="w-32 h-32" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
