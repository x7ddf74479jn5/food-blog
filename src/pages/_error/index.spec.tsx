import { mockCategories, mockConfig } from "@mocks/data";
import { render, screen } from "jest/test-utils";
import renderer from "react-test-renderer";

import ErrorPage from "./index.page";

describe("pages/_error", () => {
  const mockCategoryList = Object.values(mockCategories);
  it("snapshot", () => {
    const tree = renderer.create(<ErrorPage config={mockConfig} categories={mockCategoryList} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("OK: 初期レンダリング", async () => {
    const { unmount } = render(<ErrorPage config={mockConfig} categories={mockCategoryList} />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("Unhandled Error");
    unmount();
  });
});
