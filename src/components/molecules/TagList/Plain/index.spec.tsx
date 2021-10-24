import { mockTags } from "@mocks/data";
import React from "react";
import renderer from "react-test-renderer";

import { TagListPlain } from ".";

describe("components/molecules/TagListPlain", () => {
  const mockTagList = Object.values(mockTags);

  it("snapshot", () => {
    const tree = renderer.create(<TagListPlain tags={mockTagList} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
