import renderer from "react-test-renderer";

import { MainContainer } from ".";

describe("components/atoms/containers/MainContainer", () => {
  it("snapshot", () => {
    const tree = renderer.create(<MainContainer>children</MainContainer>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
