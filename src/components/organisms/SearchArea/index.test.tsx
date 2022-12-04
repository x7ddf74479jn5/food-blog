import userEvent from "@testing-library/user-event";
import { Providers, waitFor, withMockRouter } from "jest/test-utils";
import { act, defaultMockRouter, render, renderHook, screen } from "jest/test-utils";
import { mockCategories, mockTags } from "mocks/data";

import { useSearchMutation, useSearchState } from "@/components/organisms/SearchArea/SearchContext";
import { urlTable } from "@/utils/paths/url";

import { SearchArea, useSearchArea } from ".";
import { useSearch } from "./useSearch";

const mockTagList = Object.values(mockTags);
const mockCategoryList = Object.values(mockCategories);

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Providers>{withMockRouter(children, { router: defaultMockRouter })}</Providers>
);

describe("components/organisms/SearchArea", () => {
  it("OK: 初期レンダリング", () => {
    render(<SearchArea categories={mockCategoryList} tags={mockTagList} />);

    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "詳細検索" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "検索" })).toBeInTheDocument();
  });

  describe("ユーザーイベント", () => {
    let user: ReturnType<typeof userEvent["setup"]>;

    beforeEach(() => {
      user = userEvent.setup();
    });

    it("OK: テキスト、カテゴリー、タグを指定して検索できる", async () => {
      render(<SearchArea categories={mockCategoryList} tags={mockTagList} />);

      await user.type(screen.getByPlaceholderText("Search..."), "タコライス");
      await user.click(screen.getByRole("button", { name: "詳細検索" }));
      await user.click(screen.getByLabelText("カテゴリー"));
      await user.selectOptions(screen.getByRole("listbox"), "ご飯物");
      await user.click(screen.getAllByLabelText("タグ")[1]);
      await user.selectOptions(screen.getByRole("listbox"), "ごはん");
      await user.click(screen.getByRole("button", { name: "検索" }));

      const params = new URLSearchParams({
        category: mockCategories.rice.id,
        q: "タコライス",
        tags: mockTags.rice.id,
      });

      expect(defaultMockRouter.push).toBeCalledWith(`${urlTable.search}?${params.toString()}`);
    });
  });
});

describe("useSearch", () => {
  it("OK: 検索クエリを作成し、検索ページに遷移できる", () => {
    const { result } = renderHook(
      () =>
        useSearch({
          category: mockCategories.rice.id,
          q: "タコライス",
          tags: mockTags.rice.id,
        }),
      {
        wrapper,
      }
    );

    const { search } = result.current;

    act(() => {
      search();
    });

    const params = new URLSearchParams({
      category: mockCategories.rice.id,
      q: "タコライス",
      tags: mockTags.rice.id,
    });

    expect(defaultMockRouter.push).toBeCalledWith(`${urlTable.search}?${params.toString()}`);
  });

  it("OK: 検索履歴に登録できる", () => {
    const useAggregateSearchHook = (query: Parameters<typeof useSearch>[0]) => {
      return { ...useSearchState(), ...useSearch(query) };
    };

    const { rerender, result } = renderHook(
      () =>
        useAggregateSearchHook({
          category: mockCategories.rice.id,
          q: "タコライス",
          tags: mockTags.rice.id,
        }),
      {
        wrapper,
      }
    );

    const { search } = result.current;

    act(() => {
      search();
    });

    expect(result.current.history).toStrictEqual(["タコライス"]);

    // すでに登録している場合に重複しない
    rerender({
      category: mockCategories.rice.id,
      q: "タコライス",
      tags: mockTags.rice.id,
    });

    expect(result.current.history).toStrictEqual(["タコライス"]);
  });
});

describe("useSearchArea", () => {
  jest.mock("@/components/organisms/SearchArea/useSearch", () => ({ search: "search" }));
  it("OK", async () => {
    const useAggregateSearchHook = () => {
      return { ...useSearchMutation(), ...useSearchState(), ...useSearchArea() };
    };

    const { result } = renderHook(() => useAggregateSearchHook(), { wrapper });

    const { setSelectedCategory, setSelectedTags, setText } = result.current;

    act(() => {
      setText(" タコライス ");
      setSelectedCategory(mockCategories.rice);
      setSelectedTags([mockTags.rice]);
    });

    await waitFor(() => result.current.text === "タコライス");

    act(() => result.current.search());

    expect(defaultMockRouter.push).toBeCalledTimes(1);

    const params = new URLSearchParams({
      category: mockCategories.rice.id,
      q: "タコライス",
      tags: mockTags.rice.id,
    });

    expect(defaultMockRouter.push).toBeCalledWith(`${urlTable.search}?${params.toString()}`);
  });
});
