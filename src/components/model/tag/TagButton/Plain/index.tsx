import NextLink from "@/components/atoms/NextLink";
import type { TTag } from "@/types";
import { urlTable } from "@/utils/paths/url";

type Props = {
  tag: TTag;
  hasLink?: boolean;
};

export const TagButtonPlain: React.FC<Props> = ({ hasLink = false, tag }) => {
  if (hasLink) {
    return (
      <NextLink href={`${urlTable.tags}/${tag.slug}`}>
        <span className="inline-block text-sm leading-tight text-gray-600 dark:text-gray-300">{`#${tag.name}`}</span>
      </NextLink>
    );
  }

  return <span className="inline-block text-sm leading-tight text-gray-600 dark:text-gray-300">{`#${tag.name}`}</span>;
};
