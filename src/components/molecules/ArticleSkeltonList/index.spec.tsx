import renderer from "react-test-renderer";

import { ArticleSkeltonList } from "../ArticleSkeltonList";

describe("components/molecules/ArticleSkeltonList", () => {
  it("snapshot", () => {
    const tree = renderer.create(<ArticleSkeltonList />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
