import { render, screen } from "jest/test-utils";

import { getBackLinks, urlTable } from "@/utils/paths/url";

import BackLinks from ".";

describe("components/feature/BackLinks", () => {
  const mockBackLinks = getBackLinks([urlTable.home]);

  it("OK: 表示が正しい", () => {
    render(<BackLinks links={mockBackLinks} />);
    const button = screen.getByRole("button", { name: "前のページへ" });
    expect(button).toBeInTheDocument();
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveAttribute("href", urlTable.home);
    expect(anchor).toHaveTextContent(mockBackLinks[0].label);
  });
});
