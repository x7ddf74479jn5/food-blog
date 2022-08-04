import { render } from "jest/test-utils";

import { HtmlHeadNoIndex } from ".";

jest.mock("next/head", () => {
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

describe("components/atoms/meta/HtmlHeadNoIndex", () => {
  it("OK: 出力結果が正しい", () => {
    const { container } = render(<HtmlHeadNoIndex />);
    expect(container.querySelector('meta[name="robots"]')?.attributes.getNamedItem("content")?.value).toBe("noindex");
  });
});
