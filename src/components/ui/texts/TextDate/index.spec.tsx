import { render } from "jest/test-utils";

import TextDate from ".";

describe("components/ui/texts/TextDate", () => {
  const date = new Date("2020-12-12T00:00:00+09:00");

  it("OK: 正しく表示されている", () => {
    const { container } = render(<TextDate date={date} />);
    const time = container.querySelector("time");
    expect(time).toHaveTextContent("2020年12月12日");
    expect(time).toHaveAttribute("dateTime", "2020-12-12T00:00:00+09:00");
  });
});
