import { render, screen } from "jest/test-utils";
import { mockTags } from "mocks/data";

import { urlTable } from "@/utils/paths/url";

import { TagButtonColored } from ".";

describe("components/model/tag/TagButtonColored", () => {
  const tagRice = mockTags.rice;

  it("OK: ラベルが表示されている", () => {
    const { container } = render(<TagButtonColored tag={tagRice} />);
    expect(container).toHaveTextContent(tagRice.name);
  });

  it("OK: aタグのhrefが正しい", () => {
    render(<TagButtonColored tag={tagRice} />);
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveAttribute("href", `${urlTable.tags}/${tagRice.slug}`);
  });
});
