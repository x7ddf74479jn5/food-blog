import userEvent from "@testing-library/user-event";
import { render, screen, withMockRouter } from "jest/test-utils";
import { mockCategories, mockTags } from "mocks/data";

import { SearchFilter } from ".";

describe("components/organisms/SearchArea/SearchFilter", () => {
  const mockTagList = Object.values(mockTags);
  const mockCategoryList = Object.values(mockCategories);
  const fakeOnToggle = jest.fn();

  it("OK: 初期レンダリング", () => {
    render(<SearchFilter categories={mockCategoryList} tags={mockTagList} onToggle={fakeOnToggle} />);

    const label = screen.getByRole("button", { name: "詳細検索" });
    expect(label).toBeInTheDocument();
    const categoryLabel = screen.queryByText("カテゴリー");
    expect(categoryLabel).not.toBeInTheDocument();
    const tagLabel = screen.queryByText("タグ");
    expect(tagLabel).not.toBeInTheDocument();
  });

  describe("ユーザーイベント", () => {
    let user: ReturnType<typeof userEvent["setup"]>;

    beforeEach(() => {
      user = userEvent.setup();
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it("OK: ディスクロージャー展開後の表示が正しい", async () => {
      render(
        withMockRouter(<SearchFilter categories={mockCategoryList} tags={mockTagList} onToggle={fakeOnToggle} />, {
          context: { pathname: "/" },
        })
      );

      const button = screen.getByRole("button", { name: "詳細検索" });
      await user.click(button);
      const categoryLabel = screen.getByText("カテゴリー");
      expect(categoryLabel).toBeInTheDocument();
      const tagLabel = screen.getByText("タグ");
      expect(tagLabel).toBeInTheDocument();
      expect(fakeOnToggle).toBeCalled();
    });
    it("OK: 検索結果ページでのディスクロージャー展開後の表示が正しい", async () => {
      render(
        withMockRouter(<SearchFilter categories={mockCategoryList} tags={mockTagList} onToggle={fakeOnToggle} />, {
          context: { pathname: "/search" },
        })
      );

      const categoryLabel = screen.getByText("カテゴリー");
      expect(categoryLabel).toBeInTheDocument();
      const tagLabel = screen.getByText("タグ");
      expect(tagLabel).toBeInTheDocument();
      expect(fakeOnToggle).toBeCalled();
    });
  });
});
