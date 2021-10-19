import { mockConfig } from "@mocks/data/config";
import renderer from "react-test-renderer";

import { ShareButtons } from ".";

describe("components/atoms/ShareButtons", () => {
  const { host, siteTitle } = mockConfig;
  it("snapshot", () => {
    const tree = renderer.create(<ShareButtons url={host} title={siteTitle} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
