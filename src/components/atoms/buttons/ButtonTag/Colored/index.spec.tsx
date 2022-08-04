import { render, screen } from "jest/test-utils";
import { mockTags } from "mocks/data";
import renderer from "react-test-renderer";

import { urlTable } from "@/utils/paths/url";

import { ButtonTagColored } from ".";

describe("components/atoms/buttons/ButtonTagColored", () => {
  const tagRice = mockTags.rice;

  it("snapshot", () => {
    const tree = renderer.create(<ButtonTagColored tag={tagRice} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("OK: ラベルが表示されている", () => {
    const { container } = render(<ButtonTagColored tag={tagRice} />);
    expect(container).toHaveTextContent(tagRice.name);
  });

  it("OK: aタグのhrefが正しい", () => {
    render(<ButtonTagColored tag={tagRice} />);
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveAttribute("href", `${urlTable.tags}/${tagRice.slug}`);
  });
});
