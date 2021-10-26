import { mockConfig } from "@mocks/data";
import { render, screen } from "jest/test-utils";
import renderer from "react-test-renderer";

import Header from "../Header";

describe("components/organisms/Header", () => {
  const { siteTitle } = mockConfig;
  it("snapshot", () => {
    const tree = renderer.create(<Header siteTitle={siteTitle} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("OK: 初期表示が正しい", () => {
    render(<Header siteTitle={siteTitle} />);
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
    expect(header.tagName).toBe("HEADER");
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveTextContent(siteTitle);
    expect(anchor).toHaveAttribute("href", "/");
    const searchBoxes = screen.getAllByRole("searchbox");
    expect(searchBoxes.length).toBe(2);
  });
});
