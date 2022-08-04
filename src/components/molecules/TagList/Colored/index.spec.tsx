import { mockTags } from "@mocks/data";
import React from "react";
import renderer from "react-test-renderer";

import { TagListColored } from ".";

describe("components/molecules/TagListColored", () => {
  const mockTagList = Object.values(mockTags);

  it("snapshot", () => {
    const tree = renderer.create(<TagListColored tags={mockTagList} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
