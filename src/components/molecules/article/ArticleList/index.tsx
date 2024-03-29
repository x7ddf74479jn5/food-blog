import { memo } from "react";

import type { TArticle } from "@/types";

import { ArticleItem } from "./ArticleItem";

type ArticleListProps = {
  articles: TArticle[];
};

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  return (
    <ul className="space-y-12">
      {articles.map((article, index) => (
        <li key={article.id}>
          <ArticleItem article={article} isHighPriority={index === 0} />
        </li>
      ))}
    </ul>
  );
};

export default memo(ArticleList);
