import { render, screen } from "jest/test-utils";
import renderer from "react-test-renderer";

import { UrlTable } from "@/utils/paths/url";

import CustomLink from ".";

describe("components/atoms/mdx/CustomLink", () => {
  const externalHref = "https://www.example.com/";
  const internalHref = UrlTable.home;
  it("snapshot", () => {
    const external = renderer.create(<CustomLink href={externalHref}>external link</CustomLink>).toJSON();
    expect(external).toMatchSnapshot();

    const internal = renderer.create(<CustomLink href={internalHref}>Home</CustomLink>).toJSON();
    expect(internal).toMatchSnapshot();
  });

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
