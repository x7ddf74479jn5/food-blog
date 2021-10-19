import renderer from "react-test-renderer";

import { SideSectionContainer } from ".";

describe("components/atoms/containers/SideSectionContainer", () => {
  it("snapshot", () => {
    const tree = renderer.create(<SideSectionContainer header="header">children</SideSectionContainer>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
