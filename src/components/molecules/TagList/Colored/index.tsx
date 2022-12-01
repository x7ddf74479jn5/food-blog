import { ButtonTagColored } from "@/components/atoms/buttons";
import type { TTag } from "@/types";

type Props = {
  tags: TTag[];
};

export const TagListColored = ({ tags }: Props) => {
  return (
    <div className="flex flex-row flex-wrap items-center gap-2">
      {tags.map((tag) => (
        <ButtonTagColored tag={tag} key={tag.id} />
      ))}
    </div>
  );
};
