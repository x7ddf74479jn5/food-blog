import { mockTags } from "@mocks/data/tags";
import renderer from "react-test-renderer";

import { ButtonTagPlain } from ".";

describe("components/atoms/buttons/ButtonTagPlain", () => {
  it("snapshot", () => {
    const tree = renderer.create(<ButtonTagPlain tag={mockTags.rice} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
