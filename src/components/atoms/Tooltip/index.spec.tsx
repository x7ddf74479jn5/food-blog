import renderer from "react-test-renderer";

import Tooltip from ".";

describe("components/atoms/Tooltip", () => {
  it("snapshot", () => {
    const tree = renderer.create(<Tooltip label="label">children</Tooltip>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
