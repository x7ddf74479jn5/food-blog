import { memo } from "react";

import NextLink from "@/components/atoms/NextLink";
import Thumbnail from "@/components/atoms/Thumbnail";
import type { TArticle } from "@/types";
import { urlTable } from "@/utils/paths/url";

type ArticleItem = {
  article: TArticle;
};

export const ArticleItem: React.VFC<ArticleItem> = memo(({ article }) => {
  return (
    <article>
      <div className="mb-4">
        <Thumbnail src={article.image.url} title={article.title} id={article.id} />
      </div>
      <h2 className="mb-4 text-2xl font-bold">
        <NextLink href={`${urlTable.articles}/${article.id}`}>{article.title}</NextLink>
      </h2>
      <p className="line-clamp-2 dark:text-gray-300">{article.description}</p>
    </article>
  );
});

ArticleItem.displayName = "ArticleItem";
