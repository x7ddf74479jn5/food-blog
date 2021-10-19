import { mockArticles } from "@mocks/data";
import renderer from "react-test-renderer";

import Thumbnail from ".";

describe("components/atoms/Thumbnail", () => {
  const { title, image } = mockArticles.stock;
  it("snapshot", () => {
    const tree = renderer.create(<Thumbnail title={title} src={image.url} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
