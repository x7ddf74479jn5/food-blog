import renderer from "react-test-renderer";

import { ArticleSkelton } from ".";

describe("components/atoms/ArticleSkelton", () => {
  it("snapshot", () => {
    const tree = renderer.create(<ArticleSkelton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
