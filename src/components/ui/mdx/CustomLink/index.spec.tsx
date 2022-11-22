import { render, screen } from "jest/test-utils";

import { urlTable } from "@/utils/paths/url";

import { CustomLink } from ".";

describe("components/ui/mdx/CustomLink", () => {
  const externalHref = "https://www.example.com/";
  const internalHref = urlTable.home;

  it("OK: 外部リンクが正しく表示されている", () => {
    render(<CustomLink href={externalHref}>external link</CustomLink>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", externalHref);
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveTextContent("external link");
  });

  it("OK: 内部リンクが正しく表示されている", () => {
    render(<CustomLink href={internalHref}>Home</CustomLink>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", internalHref);
    expect(link).toHaveTextContent("Home");
  });
});
