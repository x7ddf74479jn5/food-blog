import Image from "next/image";

import NextLink from "@/components/atoms/NextLink";
import { TagListPlain } from "@/components/molecules/TagList";
import type { TArticle } from "@/types";
import { urlTable } from "@/utils/paths/url";

type Props = {
  article: TArticle;
};

export const ArticleTipWithThumb: React.VFC<Props> = ({ article }) => {
  const { id, title, tags, image } = article;
  return (
    <article className="flex flex-row max-h-36 ">
      <NextLink href={`${urlTable.articles}/${id}`}>
        <div className="flex-shrink-0 mt-1 mr-4 min-w-[max-content]">
          <Image src={image.url} alt={title} width={48} height={48} objectFit="cover" />
        </div>
      </NextLink>
      <div className="flex flex-col flex-grow">
        <NextLink href={`${urlTable.articles}/${id}`}>{title}</NextLink>
        <div className="flex-grow">
          <TagListPlain tags={tags} hasLink />
        </div>
      </div>
    </article>
  );
};

export type ArticleTipWithThumbListProps = {
  articles: TArticle[];
};

export const ArticleTipWithThumbList: React.VFC<ArticleTipWithThumbListProps> = ({ articles }) => {
  return (
    <ul className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-x-1 md:gap-x-1 lg:gap-x-1 sm:gap-y-3 md:gap-y-3 lg:gap-y-3 pb-2">
      {articles.map((article) => (
        <li key={article.id}>
          <ArticleTipWithThumb article={article} />
        </li>
      ))}
    </ul>
  );
};
