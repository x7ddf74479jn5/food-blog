import { ButtonTagPlain } from "@/components/atoms/buttons/ButtonTag";
import type { TTag } from "@/types";

type Props = {
  tags: TTag[];
  hasLink: boolean;
};

export const TagListPlain: React.VFC<Props> = ({ tags, hasLink }) => {
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-1">
      {(tags || []).map((tag) => (
        <ButtonTagPlain tag={tag} key={tag.id} hasLink={hasLink} />
      ))}
    </div>
  );
};
