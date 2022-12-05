import userEvent from "@testing-library/user-event";
import {
  defaultMockLegacyRouter,
  Providers,
  withMockLegacyRouter,
  withMockRouter,
  withMockSearchContext,
} from "jest/test-utils";
import { act, render, renderHook, screen } from "jest/test-utils";
import { mockCategories, mockTags } from "mocks/data";

import { useSearchState } from "@/components/organisms/SearchArea/SearchContext";

import { SearchArea, useSearchArea } from ".";
import { useSearch } from "./useSearch";

const mockTagList = Object.values(mockTags);
const mockCategoryList = Object.values(mockCategories);

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

const wrapper = ({ children }: { children: React.ReactNode }) => <Providers>{withMockRouter(children)}</Providers>;

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

      expect(defaultMockLegacyRouter.push).toBeCalledWith(
        {
          pathname: "/search",
          query: {
            category: mockCategories.rice.id,
            q: "タコライス",
            tags: mockTags.rice.id,
          },
        },
        undefined,
        { shallow: true }
      );
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

    expect(defaultMockLegacyRouter.push).toBeCalledWith(
      {
        pathname: "/search",
        query: {
          category: mockCategories.rice.id,
          q: "タコライス",
          tags: mockTags.rice.id,
        },
      },
      undefined,
      { shallow: true }
    );
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
  it("タコライスで検索したとき検索ページにクエリ付きで遷移する", async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      withMockSearchContext(withMockLegacyRouter(withMockRouter(children)), {
        selectedCategory: mockCategories.rice,
        selectedTags: [mockTags.rice],
        text: "タコライス",
      });

    const { result } = renderHook(() => useSearchArea(), { wrapper });

    act(() => result.current.search());

    expect(defaultMockLegacyRouter.push).toBeCalledTimes(1);

    expect(defaultMockLegacyRouter.push).toBeCalledWith(
      {
        pathname: "/search",
        query: {
          category: mockCategories.rice.id,
          q: "タコライス",
          tags: mockTags.rice.id,
        },
      },
      undefined,
      { shallow: true }
    );
  });
});
