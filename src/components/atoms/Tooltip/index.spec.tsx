import { render, screen } from "jest/test-utils";

import Tooltip from ".";

describe("components/atoms/Tooltip", () => {
  it("OK: 正しく表示されている", () => {
    render(<Tooltip label="label">children</Tooltip>);
    const elm = screen.getByText("children");
    expect(elm).toBeInTheDocument();
    const label = screen.getByText("label");
    expect(label).toBeInTheDocument();
  });
});
