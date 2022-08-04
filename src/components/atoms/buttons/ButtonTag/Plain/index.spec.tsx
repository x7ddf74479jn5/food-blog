import { render, screen } from "jest/test-utils";
import { mockTags } from "mocks/data";
import renderer from "react-test-renderer";

import { urlTable } from "@/utils/paths/url";

import { ButtonTagPlain } from ".";

describe("components/atoms/buttons/ButtonTagPlain", () => {
  const tagRice = mockTags.rice;

  it("snapshot", () => {
    const linkedButtonTagPlain = renderer.create(<ButtonTagPlain tag={mockTags.rice} hasLink />).toJSON();
    expect(linkedButtonTagPlain).toMatchSnapshot();

    const buttonTagPlain = renderer.create(<ButtonTagPlain tag={mockTags.rice} hasLink={false} />).toJSON();
    expect(buttonTagPlain).toMatchSnapshot();
  });

  it("OK: ラベルが表示されている", () => {
    const { container } = render(<ButtonTagPlain hasLink tag={tagRice} />);
    expect(container).toHaveTextContent(tagRice.name);
  });

  it("OK: aタグのhrefが正しい", () => {
    render(<ButtonTagPlain hasLink tag={tagRice} />);
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveAttribute("href", `${urlTable.tags}/${tagRice.slug}`);
  });
});
