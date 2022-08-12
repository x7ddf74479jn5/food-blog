import { render } from "jest/test-utils";

import { SlickContainer } from ".";

jest.mock("react-slick", () => {
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    default: jest.fn((args) => {
      return <div>{args.children}</div>;
    }),
  };
});

describe("components/organisms/SlickContainer", () => {
  it("OK: 初期表示が正しい", () => {
    const { container } = render(<SlickContainer>Children</SlickContainer>);

    expect(container).toHaveTextContent("Children");
  });
});
