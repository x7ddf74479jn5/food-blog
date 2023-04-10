import { memo } from "react";

import NextLink from "@/components/atoms/NextLink";
import Thumbnail from "@/components/atoms/Thumbnail";
import type { TArticle } from "@/types";
import { urlTable } from "@/utils/paths/url";

type ArticleItem = {
  article: TArticle;
  isHighPriority?: boolean;
};

export const ArticleItem: React.FC<ArticleItem> = memo(({ article, isHighPriority }) => {
  return (
    <article className="mx-auto max-w-lg">
      <div className="mb-4">
        <Thumbnail
          src={article.image.url}
          title={article.title}
          id={article.id}
          blurDataURL={article.image.url}
          alt={article.title}
          loading={isHighPriority ? "eager" : "lazy"}
          priority={isHighPriority}
        />
      </div>
      <h2 className="mb-4 text-2xl font-bold">
        <NextLink href={`${urlTable.articles}/${article.id}`}>{article.title}</NextLink>
      </h2>
      <p className="line-clamp-2 dark:text-gray-300">{article.description}</p>
    </article>
  );
});

ArticleItem.displayName = "ArticleItem";
