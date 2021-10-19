import { render } from "jest/test-utils";

import ThemeSwitch from ".";

describe("components/atoms/ThemeSwitch", () => {
  it("snapshot", () => {
    const { asFragment } = render(<ThemeSwitch />);
    expect(asFragment()).toMatchSnapshot();
  });
});
