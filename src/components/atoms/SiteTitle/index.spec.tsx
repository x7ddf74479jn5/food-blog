import { mockConfig } from "@mocks/data/config";
import renderer from "react-test-renderer";

import { SiteTitle } from ".";

describe("components/atoms/SiteTitle", () => {
  const { siteTitle } = mockConfig;

  it("snapshot", () => {
    const tree = renderer.create(<SiteTitle size="text-2xl" title={siteTitle} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
