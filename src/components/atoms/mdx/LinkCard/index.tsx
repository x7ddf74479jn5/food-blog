import Image from "next/image";
import React from "react";

import NextLink from "@/components/atoms/NextLink";
import { TagListPlain } from "@/components/molecules/TagList";
import type { TArticle } from "@/types";
import { UrlTable } from "@/utils/paths/url";

type LinkCardProps = {
  article: TArticle;
};

export const LinkCard: React.VFC<LinkCardProps> = ({ article }) => {
  const { id, title, tags, image } = article;
  return (
    <NextLink href={`${UrlTable.articles}/${id}`}>
      <div className="my-8 border border-gray-300 dark:border-gray-700">
        <article className="flex flex-row">
          <Image src={image.url} alt={title} width={128} height={96} objectFit="cover" />
          <div className="flex flex-col flex-wrap flex-grow p-4">
            <div className="flex flex-wrap">{title}</div>
            <div className="flex-grow">
              <TagListPlain tags={tags} hasLink />
            </div>
          </div>
        </article>
      </div>
    </NextLink>
  );
};
