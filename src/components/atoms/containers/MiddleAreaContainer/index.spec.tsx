import renderer from "react-test-renderer";

import { MiddleAreaContainer } from ".";

describe("components/atoms/containers/MiddleAreaContainer", () => {
  it("snapshot", () => {
    const tree = renderer.create(<MiddleAreaContainer>children</MiddleAreaContainer>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
