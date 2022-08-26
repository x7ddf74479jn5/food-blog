import userEvent from "@testing-library/user-event";
import { render, screen } from "jest/test-utils";
import { ThemeProvider } from "next-themes";

import { ThemeSwitch } from ".";

describe("components/molecules/ThemeSwitch", () => {
  it("OK: スイッチが正常に切り替わる", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider enableSystem>
        <ThemeSwitch />
      </ThemeProvider>
    );
    const checkbox = screen.getByRole("switch");
    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
