import { mockArticles } from "@mocks/data";
import { fireEvent, render, screen } from "jest/test-utils";
import renderer from "react-test-renderer";

import * as useGetArticleQuery from "@/hooks/useGetArticleListQuery";

import { ArticleSuspenseContainer } from ".";

let spyUseGetArticleQuery: jest.SpyInstance;
const mockPaginate = jest.fn();

describe("components/molecules/ArticleSuspenseContainer", () => {
  describe("OK: データがある", () => {
    describe("次ページがある", () => {
      beforeEach(() => {
        spyUseGetArticleQuery = jest.spyOn(useGetArticleQuery, "default");
        spyUseGetArticleQuery.mockReturnValue({
          articles: [mockArticles.stock],
          hasNextPage: true,
          error: undefined,
          isValidating: false,
          paginate: mockPaginate,
          setSize: jest.fn(),
          size: 1,
          data: [],
          getCurrentKey: jest.fn(),
          revalidate: jest.fn(),
          mutate: jest.fn(),
        });
      });
      afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
      });

      it("Snapshot", () => {
        const tree = renderer.create(<ArticleSuspenseContainer />).toJSON();
        expect(tree).toMatchSnapshot();
      });

      it("OK: 初期レンダリング", () => {
        render(<ArticleSuspenseContainer />);
        const article = screen.getByRole("article");
        expect(article).toBeInTheDocument();
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
      });

      it("Interaction", () => {
        render(<ArticleSuspenseContainer />);
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toBeEnabled();
        fireEvent.click(button);
        expect(mockPaginate).toBeCalled();
      });
    });

    describe("次ページがない", () => {
      beforeEach(() => {
        spyUseGetArticleQuery = jest.spyOn(useGetArticleQuery, "default");
        spyUseGetArticleQuery.mockReturnValue({
          articles: [mockArticles.stock],
          hasNextPage: false,
          error: undefined,
          isValidating: false,
          paginate: mockPaginate,
          setSize: jest.fn(),
          size: 1,
          data: [],
          getCurrentKey: jest.fn(),
          revalidate: jest.fn(),
          mutate: jest.fn(),
        });
      });
      afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
      });
      it("Snapshot", () => {
        const tree = renderer.create(<ArticleSuspenseContainer />).toJSON();
        expect(tree).toMatchSnapshot();
      });

      it("OK: 初期レンダリング", () => {
        render(<ArticleSuspenseContainer />);
        const article = screen.getByRole("article");
        expect(article).toBeInTheDocument();
        const button = screen.queryByRole("button");
        expect(button).not.toBeInTheDocument();
      });
    });

    describe("ローディング", () => {
      beforeEach(() => {
        spyUseGetArticleQuery = jest.spyOn(useGetArticleQuery, "default");
        spyUseGetArticleQuery.mockReturnValue({
          articles: [mockArticles.stock],
          hasNextPage: true,
          error: undefined,
          isValidating: true,
          paginate: mockPaginate,
          setSize: jest.fn(),
          size: 1,
          data: [],
          getCurrentKey: jest.fn(),
          revalidate: jest.fn(),
          mutate: jest.fn(),
        });
      });
      afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
      });

      it("Snapshot", () => {
        const tree = renderer.create(<ArticleSuspenseContainer />).toJSON();
        expect(tree).toMatchSnapshot();
      });

      it("OK: 初期レンダリング", () => {
        render(<ArticleSuspenseContainer />);
        const button = screen.queryByRole("button");
        expect(button).not.toBeInTheDocument();
      });
    });
  });

  describe("OK: データがない", () => {
    beforeEach(() => {
      spyUseGetArticleQuery = jest.spyOn(useGetArticleQuery, "default");
      spyUseGetArticleQuery.mockReturnValue({
        articles: [],
        hasNextPage: false,
        error: undefined,
        isValidating: false,
        paginate: mockPaginate,
        setSize: jest.fn(),
        size: 1,
        data: [],
        getCurrentKey: jest.fn(),
        revalidate: jest.fn(),
        mutate: jest.fn(),
      });
    });

    it("Snapshot", () => {
      const tree = renderer.create(<ArticleSuspenseContainer />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("OK: 初期レンダリング", () => {
      const { container } = render(<ArticleSuspenseContainer />);

      const article = screen.queryByRole("article");
      expect(article).not.toBeInTheDocument();
      const button = screen.queryByRole("button");
      expect(button).not.toBeInTheDocument();
      expect(container).toHaveTextContent("レシピが見つかりませんでした。");
    });
  });

  describe("NG:  エラー", () => {
    beforeEach(() => {
      spyUseGetArticleQuery = jest.spyOn(useGetArticleQuery, "default");
      spyUseGetArticleQuery.mockReturnValue({
        articles: [],
        hasNextPage: false,
        error: new Error(),
        isValidating: false,
        paginate: mockPaginate,
        setSize: jest.fn(),
        size: 1,
        data: [],
        getCurrentKey: jest.fn(),
        revalidate: jest.fn(),
        mutate: jest.fn(),
      });
    });

    it("Snapshot", () => {
      const tree = renderer.create(<ArticleSuspenseContainer />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("OK: 初期レンダリング", () => {
      const { container } = render(<ArticleSuspenseContainer />);

      const article = screen.queryByRole("article");
      expect(article).not.toBeInTheDocument();
      const button = screen.queryByRole("button");
      expect(button).not.toBeInTheDocument();
      expect(container).toHaveTextContent("エラーが発生しました。");
    });
  });
});
