import { mockArticles } from "@mocks/data";
import { render, screen } from "jest/test-utils";
import React from "react";
import renderer from "react-test-renderer";

import { ArticleTipWithThumb, ArticleTipWithThumbList } from "../ArticleTipList";

describe("components/molecules/ArticleTipList", () => {
  const mockArticleList = Object.values(mockArticles);
  const mockArticleStock = mockArticles.stock;

  describe("ArticleTipWithThumb", () => {
    it("snapshot", () => {
      const tree = renderer.create(<ArticleTipWithThumb article={mockArticleStock} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("OK: 表示が正しい", () => {
      render(<ArticleTipWithThumb article={mockArticleStock} />);
      const articleLink = screen.getAllByRole("link")[0];
      expect(articleLink).toHaveAttribute("href", `/articles/${mockArticleStock.id}`);
      const title = screen.getByText(mockArticleStock.title);
      expect(title).toBeInTheDocument();
      mockArticleStock.tags.forEach((tag) => {
        const tagEl = screen.getByText(`#${tag.name}`);
        expect(tagEl).toBeInTheDocument();
      });
    });
  });

  describe("ArticleTipWithThumbList", () => {
    it("snapshot", () => {
      const tree = renderer.create(<ArticleTipWithThumbList articles={mockArticleList} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("OK: 表示が正しい", () => {
      render(<ArticleTipWithThumbList articles={mockArticleList} />);
      const articles = screen.getAllByRole("article");
      expect(articles.length).toBe(mockArticleList.length);
    });
  });
});
