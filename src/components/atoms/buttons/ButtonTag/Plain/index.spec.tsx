import { render, screen } from "jest/test-utils";
import { mockTags } from "mocks/data";
import renderer from "react-test-renderer";

import { UrlTable } from "@/utils/paths/url";

import { ButtonTagPlain } from ".";

describe("components/atoms/buttons/ButtonTagPlain", () => {
  const tagRice = mockTags.rice;

  it("snapshot", () => {
    const tree = renderer.create(<ButtonTagPlain tag={mockTags.rice} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("OK: ラベルが表示されている", () => {
    const { container } = render(<ButtonTagPlain tag={tagRice} />);
    expect(container).toHaveTextContent(tagRice.name);
  });

  it("OK: aタグのhrefが正しい", () => {
    render(<ButtonTagPlain tag={tagRice} />);
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveAttribute("href", `${UrlTable.tags}/${tagRice.slug}`);
  });
});
