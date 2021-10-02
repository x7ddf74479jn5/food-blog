import NextLink from "@/components/atoms/NextLink";
import type { TTag } from "@/types";
import { UrlTable } from "@/utils/paths/url";

type Props = {
  tag: TTag;
};

export const ButtonTagPlain: React.FC<Props> = ({ tag }) => (
  <NextLink href={`${UrlTable.tags}/${tag.slug}`}>
    <span>{`#${tag.name}`}</span>
  </NextLink>
);
