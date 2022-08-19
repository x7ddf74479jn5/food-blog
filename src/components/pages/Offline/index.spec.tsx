import { mockCategories, mockConfig } from "@mocks/data";
import { render, screen } from "jest/test-utils";

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

jest.mock("react-slick", () => {
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    default: jest.fn((args) => {
      return <div>{args.children}</div>;
    }),
  };
});

describe("pages/_offline", () => {
  const mockCategoryList = Object.values(mockCategories);

  it("OK: 初期レンダリング", async () => {
    render(<Offline categories={mockCategoryList} config={mockConfig} />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("オフラインページ");
  });
});
