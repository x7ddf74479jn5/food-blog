import { mockConfig } from "@mocks/data/config";
import { render, screen } from "jest/test-utils";

import { SiteTitle } from ".";

describe("components/atoms/SiteTitle", () => {
  const { siteTitle } = mockConfig;

  it("OK: 正しく表示されている", () => {
    render(<SiteTitle size="text-2xl" title={siteTitle} />);
    const link = screen.getByRole("link");
    expect(link).toHaveTextContent(siteTitle);
    expect(link).toHaveAttribute("href", "/");
  });
});
