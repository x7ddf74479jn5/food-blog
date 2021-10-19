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
});
