import { memo } from "react";

import type { TArticle } from "@/types";

import { ArticleItem } from "./ArticleItem";

type ArticleListProps = {
  articles: TArticle[];
};

export const ArticleList: React.FC<ArticleListProps> = memo(({ articles }) => {
  return (
    <ul className="space-y-12">
      {articles.map((article) => (
        <li key={article.id}>
          <ArticleItem article={article} />
        </li>
      ))}
    </ul>
  );
});

ArticleList.displayName = "ArticleList";
