import { ButtonTagPlain } from "@/components/atoms/buttons/ButtonTag";
import type { TTag } from "@/types";

type Props = {
  tags: TTag[];
  hasLink?: boolean;
};

export const TagListPlain: React.VFC<Props> = ({ tags, hasLink = false }) => {
  return (
    <ul className="flex flex-wrap gap-x-2 gap-y-1">
      {(tags || []).map((tag) => (
        <li key={tag.id}>
          <ButtonTagPlain tag={tag} hasLink={hasLink} />
        </li>
      ))}
    </ul>
  );
};
