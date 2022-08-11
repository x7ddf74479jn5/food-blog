import Image from "next/image";
import { memo } from "react";

import NextLink from "@/components/atoms/NextLink";
import { TagListPlain } from "@/components/molecules/TagList";
import type { TArticle } from "@/types";
import { urlTable } from "@/utils/paths/url";

type Props = {
  article: TArticle;
};

export const ArticleTipWithThumb: React.FC<Props> = ({ article }) => {
  const { id, title, tags, image } = article;
  return (
    <article className="flex max-h-36 flex-row ">
      <NextLink href={`${urlTable.articles}/${id}`}>
        <div className="mt-1 mr-4 min-w-[max-content] shrink-0">
          <Image src={image.url} alt={title} width={48} height={48} objectFit="cover" />
        </div>
      </NextLink>
      <div className="flex grow flex-col">
        <NextLink href={`${urlTable.articles}/${id}`}>{title}</NextLink>
        <div className="grow">
          <TagListPlain tags={tags} hasLink />
        </div>
      </div>
    </article>
  );
};

export type ArticleTipWithThumbListProps = {
  articles: TArticle[];
};

export const ArticleTipWithThumbList: React.FC<ArticleTipWithThumbListProps> = memo(({ articles }) => {
  return (
    <ul className="grid gap-2 pb-2 sm:grid-cols-2 sm:gap-x-1 sm:gap-y-3 md:grid-cols-2 md:gap-x-1 md:gap-y-3 lg:grid-cols-1 lg:gap-x-1 lg:gap-y-3">
      {articles.map((article) => (
        <li key={article.id}>
          <ArticleTipWithThumb article={article} />
        </li>
      ))}
    </ul>
  );
});

ArticleTipWithThumbList.displayName = "ArticleTipWithThumbList";
