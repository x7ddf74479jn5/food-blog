import renderer from "react-test-renderer";

import { HeadingOne } from ".";

describe("components/atoms/texts/HeadingOne", () => {
  const text = "Heading 1";
  it("snapshot", () => {
    const tree = renderer.create(<HeadingOne>{text}</HeadingOne>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
