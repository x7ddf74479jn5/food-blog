import renderer from "react-test-renderer";

import { UrlTable } from "@/utils/paths/url";

import NextLink from ".";

describe("components/atoms/NextLink", () => {
  const homeUrl = UrlTable.home;
  it("snapshot", () => {
    const tree = renderer.create(<NextLink href={homeUrl}>Home</NextLink>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
