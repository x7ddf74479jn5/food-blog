import renderer from "react-test-renderer";

import { Callout } from ".";

describe("components/atoms/mdx/Callout", () => {
  it("snapshot", () => {
    const tree = renderer.create(<Callout>children</Callout>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
