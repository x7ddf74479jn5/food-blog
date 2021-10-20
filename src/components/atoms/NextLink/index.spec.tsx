import { render, screen } from "jest/test-utils";
import renderer from "react-test-renderer";

import { UrlTable } from "@/utils/paths/url";

import NextLink from ".";

describe("components/atoms/NextLink", () => {
  const homeUrl = UrlTable.home;
  it("snapshot", () => {
    const tree = renderer.create(<NextLink href={homeUrl}>Home</NextLink>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("OK: リンクが正しく表示されている", () => {
    render(<NextLink href={homeUrl}>Home</NextLink>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", homeUrl);
    expect(link).toHaveTextContent("Home");
  });
});
