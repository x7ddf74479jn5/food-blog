import { render, screen } from "jest/test-utils";
import { mockCategories, mockConfig, mockTags } from "mocks/data";

import Header from "../Header";

describe("components/organisms/Header", () => {
  const { siteTitle } = mockConfig;
  const categoryList = Object.values(mockCategories);
  const mockTagList = Object.values(mockTags);

  it("OK: 初期表示が正しい", () => {
    render(<Header categories={categoryList} siteTitle={siteTitle} tags={mockTagList} />);
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
    expect(header.tagName).toBe("HEADER");
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveTextContent(siteTitle);
    expect(anchor).toHaveAttribute("href", "/");
    const searchBoxes = screen.getAllByRole("combobox");
    expect(searchBoxes.length).toBe(1);
  });
});
