import { memo } from "react";

import { ArticleItem } from "@/components/molecules/ArticleItem";
import type { TArticle } from "@/types";

type ArticleListProps = {
  articles: TArticle[];
};

const ArticleList: React.VFC<ArticleListProps> = ({ articles }) => {
  return (
    <ul className="space-y-12">
      {articles.map((article) => (
        <li key={article.id}>
          <ArticleItem article={article} />
        </li>
      ))}
    </ul>
  );
};

export default memo(ArticleList);
