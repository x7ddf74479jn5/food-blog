import { mockPickup } from "@mocks/data";
import { render, screen } from "jest/test-utils";
import renderer from "react-test-renderer";

import { SlickArticles } from ".";

jest.mock("react-slick", () => {
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    default: jest.fn((args) => {
      return <div>{args.children}</div>;
    }),
  };
});

describe("components/organisms/SlickArticles", () => {
  const { description, articles } = mockPickup;
  it("snapshot", () => {
    const tree = renderer.create(<SlickArticles pickup={mockPickup} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("OK: 初期表示が正しい", () => {
    const { container } = render(<SlickArticles pickup={mockPickup} />);
    expect(container).toHaveTextContent("PICKUP");
    expect(container).toHaveTextContent(description);
    const articleEls = screen.getAllByRole("article");
    expect(articleEls.length).toBe(articles.length);
  });
});
