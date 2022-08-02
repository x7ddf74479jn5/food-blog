import userEvent from "@testing-library/user-event";
import { render, screen } from "jest/test-utils";

import ThemeSwitch from ".";

describe("components/atoms/ThemeSwitch", () => {
  it("OK: スイッチが正常に切り替わる", async () => {
    const user = userEvent.setup();
    render(<ThemeSwitch />);
    const checkbox = screen.getByRole("switch");
    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
