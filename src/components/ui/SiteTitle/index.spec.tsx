import { render, screen } from "jest/test-utils";
import { mockConfig } from "mocks/data/config";

import { SiteTitle } from ".";

describe("components/ui/SiteTitle", () => {
  const { siteTitle } = mockConfig;

  it("OK: 正しく表示されている", async () => {
    render(await SiteTitle({ size: "lg" }));
    const link = screen.getByRole("link");
    expect(link).toHaveTextContent(siteTitle);
    expect(link).toHaveAttribute("href", "/");
  });
});
