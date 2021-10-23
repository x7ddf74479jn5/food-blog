import Image from "next/image";

import NextLink from "@/components/atoms/NextLink";
import { TagListPlain } from "@/components/molecules/TagList";
import type { TArticle } from "@/types";
import { UrlTable } from "@/utils/paths/url";

type Props = {
  article: TArticle;
};

export const ArticleTipWithThumb: React.VFC<Props> = ({ article }) => {
  const { id, title, tags, image } = article;
  return (
    <NextLink href={`${UrlTable.articles}/${id}`}>
      <article className="flex flex-row max-h-36 ">
        <div className="flex-shrink-0 mt-1 mr-4">
          <Image src={image.url} alt={title} width={32} height={32} objectFit="cover"></Image>
        </div>
        <div className="flex flex-col flex-grow">
          <div>{title}</div>
          <div className="flex-grow">
            <TagListPlain tags={tags} />
          </div>
        </div>
      </article>
    </NextLink>
  );
};

export type ArticleTipWithThumbListProps = {
  articles: TArticle[];
};

export const ArticleTipWithThumbList: React.VFC<ArticleTipWithThumbListProps> = ({ articles }) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-x-1 md:gap-x-1 lg:gap-x-1 sm:gap-y-3 md:gap-y-3 lg:gap-y-3 pb-2">
      {articles.map((article) => (
        <ArticleTipWithThumb key={article.id} article={article} />
      ))}
    </div>
  );
};
