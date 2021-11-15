import { mockTags } from "@mocks/data";
import React from "react";
import renderer from "react-test-renderer";

import { TagListPlain } from ".";

describe("components/molecules/TagListPlain", () => {
  const mockTagList = Object.values(mockTags);

  it("snapshot", () => {
    const linkedTagList = renderer.create(<TagListPlain tags={mockTagList} hasLink />).toJSON();
    expect(linkedTagList).toMatchSnapshot();

    const tagList = renderer.create(<TagListPlain tags={mockTagList} hasLink={false} />).toJSON();
    expect(tagList).toMatchSnapshot();
  });
});
