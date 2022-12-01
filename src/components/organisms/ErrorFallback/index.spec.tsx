import { render, screen } from "jest/test-utils";

import { ErrorFallback } from ".";

describe("components/organisms/ErrorFallback", () => {
  it("OK: 初期表示が正しい", () => {
    render(<ErrorFallback heading="heading" message="message" />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("heading");
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Homeに戻る");
  });
});
