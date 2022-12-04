import Image from "next/image";

import NextLink from "@/components/atoms/NextLink";
import { TagListPlain } from "@/components/molecules/TagList";
import type { TArticle } from "@/types";
import { urlTable } from "@/utils/paths/url";

type LinkCardProps = {
  article: TArticle;
};

export const LinkCard: React.FC<LinkCardProps> = ({ article }) => {
  const { id, image, tags, title } = article;
  return (
    <NextLink href={`${urlTable.articles}/${id}`}>
      <div className="not-prose my-8 border border-gray-300 dark:border-gray-700">
        <article className="flex flex-row">
          <Image
            src={image.url}
            alt={title}
            width={128}
            height={96}
            className="h-auto w-24 object-cover sm:w-32"
            placeholder="blur"
            blurDataURL={image.blurDataURL}
          />
          <div className="flex grow flex-col flex-wrap p-4">
            <div className="flex flex-wrap">{title}</div>
            <div className="grow">
              <TagListPlain tags={tags} />
            </div>
          </div>
        </article>
      </div>
    </NextLink>
  );
};
