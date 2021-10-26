import userEvent from "@testing-library/user-event";
import { render, screen } from "jest/test-utils";

import ThemeSwitch from ".";

describe("components/atoms/ThemeSwitch", () => {
  it("snapshot", () => {
    const { asFragment } = render(<ThemeSwitch />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("OK: スイッチが正常に切り替わる", () => {
    render(<ThemeSwitch />);
    const checkbox = screen.getByRole("switch");
    expect(checkbox).not.toBeChecked();
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
