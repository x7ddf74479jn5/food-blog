import { render, screen } from "jest/test-utils";
import React from "react";
import renderer from "react-test-renderer";

import { getBackLinks, UrlTable } from "@/utils/paths/url";

import BackLinks from "../BackLinks";

describe("components/molecules/BackLinks", () => {
  const mockBackLinks = getBackLinks([UrlTable.home]);

  it("snapshot", () => {
    const tree = renderer.create(<BackLinks links={mockBackLinks} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("OK: 表示が正しい", () => {
    render(<BackLinks links={mockBackLinks} />);
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveAttribute("href", UrlTable.home);
    expect(anchor).toHaveTextContent(mockBackLinks[0].label);
  });
});
