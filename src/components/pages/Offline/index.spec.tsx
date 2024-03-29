import { render, screen } from "jest/test-utils";
import { mockCategories, mockConfig, mockTags } from "mocks/data";

import { Offline } from ".";

jest.mock("next/head", () => {
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

describe("pages/_offline", () => {
  const mockCategoryList = Object.values(mockCategories);
  const mockTagList = Object.values(mockTags);

  it("OK: 初期レンダリング", async () => {
    render(<Offline categories={mockCategoryList} config={mockConfig} tags={mockTagList} />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("オフラインページ");
  });
});
