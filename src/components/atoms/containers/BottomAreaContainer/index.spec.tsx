import renderer from "react-test-renderer";

import { BottomAreaContainer } from ".";

describe("components/atoms/containers/BottomAreaContainer", () => {
  it("snapshot", () => {
    const tree = renderer.create(<BottomAreaContainer>children</BottomAreaContainer>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
