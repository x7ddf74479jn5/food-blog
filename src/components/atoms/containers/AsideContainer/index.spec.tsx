import renderer from "react-test-renderer";

import { AsideContainer } from ".";

describe("components/atoms/containers/AsideContainer", () => {
  it("snapshot", () => {
    const treeLeft = renderer.create(<AsideContainer side="left">children</AsideContainer>).toJSON();
    expect(treeLeft).toMatchSnapshot();
    const treeRight = renderer.create(<AsideContainer side="right">children</AsideContainer>).toJSON();
    expect(treeRight).toMatchSnapshot();
  });
});
