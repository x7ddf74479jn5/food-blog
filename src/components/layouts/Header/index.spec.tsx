import { render, screen } from "jest/test-utils";
import { mockConfig } from "mocks/data";

import { Header } from ".";

describe("components/layouts/Header", () => {
  const { siteTitle } = mockConfig;

  it("OK: 初期表示が正しい", async () => {
    render(await Header());
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
    expect(header.tagName).toBe("HEADER");
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveTextContent(siteTitle);
    expect(anchor).toHaveAttribute("href", "/");
    const searchBoxes = screen.getAllByRole("combobox");
    expect(searchBoxes.length).toBe(1);
  });
});
