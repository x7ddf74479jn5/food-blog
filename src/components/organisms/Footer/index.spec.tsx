import { render, screen } from "jest/test-utils";
import { mockConfig } from "mocks/data";

import Footer from ".";

describe("components/organisms/Footer", () => {
  const { organization, siteTitle } = mockConfig;

  it("OK: 表示が正しい", () => {
    render(<Footer organization={organization} siteTitle={siteTitle} />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
    expect(footer.tagName).toBe("FOOTER");
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveTextContent(siteTitle);
    expect(anchor).toHaveAttribute("href", "/");
    expect(footer).toHaveTextContent(organization);
  });
});
