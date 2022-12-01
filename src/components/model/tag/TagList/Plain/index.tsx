import { TagButtonPlain } from "@/components/model/tag/TagButton";
import type { TTag } from "@/types";

type Props = {
  tags: TTag[];
  hasLink?: boolean;
};

export const TagListPlain: React.FC<Props> = ({ hasLink = false, tags }) => {
  return (
    <ul className="flex flex-wrap gap-x-2 gap-y-1">
      {(tags || []).map((tag) => (
        <li key={tag.id}>
          <TagButtonPlain tag={tag} hasLink={hasLink} />
        </li>
      ))}
    </ul>
  );
};
