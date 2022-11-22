import userEvent from "@testing-library/user-event";
import { render, screen } from "jest/test-utils";
import { mockTags } from "mocks/data";

import { TagCombobox } from ".";

describe("components/feature/SearchArea/SearchFilter/TagCombobox", () => {
  const mockTagList = Object.values(mockTags);
  it("OK: 初期レンダリング", () => {
    const { container } = render(<TagCombobox tags={mockTagList} />);

    const label = screen.getByText("タグ");
    expect(label).toBeInTheDocument();

    const value = container.querySelector(".dropdown-textfield");
    expect(value).toHaveTextContent("");

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  describe("ユーザーイベント", () => {
    let user: ReturnType<typeof userEvent["setup"]>;

    beforeEach(() => {
      user = userEvent.setup();
    });

    it("OK: コンボボックス展開後の表示が正しい", async () => {
      render(<TagCombobox tags={mockTagList} />);

      const button = screen.getByRole("button");
      await user.click(button);
      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(12);

      const rice = options[4];
      expect(rice).toHaveClass("dropdown-inactive");

      await user.hover(rice);
      expect(rice).toHaveClass("dropdown-active");
    });

    it("OK: ポインタ操作で値を設定できる", async () => {
      render(<TagCombobox tags={mockTagList} />);

      const button = screen.getByRole("button");
      await user.click(button);
      const options = screen.getAllByRole("option");
      const rice = options[9];
      await user.click(rice);
      const currentTag = screen.getByTestId("current-tag-name");
      expect(currentTag).toHaveTextContent("ごはん");
    });

    it("OK: キーボード操作で値を設定できる", async () => {
      render(<TagCombobox tags={mockTagList} />);

      const input = screen.getByRole("combobox");
      await user.click(input);
      await user.type(input, "ごはん");
      const options = screen.getAllByRole("option");
      expect(options.length).toBe(1);
      const rice = options[0];
      expect(rice).toHaveTextContent("ごはん");

      await user.keyboard("{enter}");
      const currentTag = screen.getByTestId("current-tag-name");
      expect(currentTag).toHaveTextContent("ごはん");
    });
  });
});
