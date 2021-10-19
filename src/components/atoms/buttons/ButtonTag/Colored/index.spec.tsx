import { mockTags } from "@mocks/data/tags";
import renderer from "react-test-renderer";

import { ButtonTagColored } from ".";

describe("components/atoms/buttons/ButtonTagColored", () => {
  it("snapshot", () => {
    const tree = renderer.create(<ButtonTagColored tag={mockTags.rice} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
