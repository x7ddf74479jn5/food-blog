import { render } from "jest/test-utils";
import renderer from "react-test-renderer";

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
  it("snapshot", () => {
    const tree = renderer.create(<HtmlHeadNoIndex />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("OK: 出力結果が正しい", () => {
    const { container } = render(<HtmlHeadNoIndex />);
    expect(container.querySelector('meta[name="robots"]')?.attributes.getNamedItem("content")?.value).toBe("noindex");
  });
});
