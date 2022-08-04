import { render, screen } from "jest/test-utils";
import renderer from "react-test-renderer";

import Tooltip from ".";

describe("components/atoms/Tooltip", () => {
  it("snapshot", () => {
    const tree = renderer.create(<Tooltip label="label">children</Tooltip>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("OK: 正しく表示されている", () => {
    render(<Tooltip label="label">children</Tooltip>);
    const elm = screen.getByText("children");
    expect(elm).toBeInTheDocument();
    const label = screen.getByText("label");
    expect(label).toBeInTheDocument();
  });
});
