import { render, screen } from "jest/test-utils";

import { urlTable } from "@/utils/paths/url";

import NextLink from ".";

describe("components/ui/NextLink", () => {
  const homeUrl = urlTable.home;

  it("OK: リンクが正しく表示されている", () => {
    render(<NextLink href={homeUrl}>Home</NextLink>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", homeUrl);
    expect(link).toHaveTextContent("Home");
  });
});
