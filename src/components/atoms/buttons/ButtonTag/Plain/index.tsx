import NextLink from "@/components/atoms/NextLink";
import type { TTag } from "@/types";
import { UrlTable } from "@/utils/paths/url";

type Props = {
  tag: TTag;
  hasLink: boolean;
};

export const ButtonTagPlain: React.FC<Props> = ({ tag, hasLink }) => {
  if (hasLink) {
    return (
      <NextLink href={`${UrlTable.tags}/${tag.slug}`}>
        <span className="inline-block text-sm leading-tight text-gray-600 dark:text-gray-300">{`#${tag.name}`}</span>
      </NextLink>
    );
  }

  return <span className="inline-block text-sm leading-tight text-gray-600 dark:text-gray-300">{`#${tag.name}`}</span>;
};
