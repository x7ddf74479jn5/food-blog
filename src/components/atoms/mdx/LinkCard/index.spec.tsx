import { mockArticles } from "mocks/data";
import renderer from "react-test-renderer";

import { LinkCard } from ".";

describe("components/atoms/mdx/LinkCard", () => {
  it("snapshot", () => {
    const tree = renderer.create(<LinkCard article={mockArticles.stock} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
