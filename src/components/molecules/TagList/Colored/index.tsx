import { ButtonTagColored } from "@/components/atoms/buttons/ButtonTag";
import type { TTag } from "@/types";

type Props = {
  tags: TTag[];
};

export const TagListColored = ({ tags }: Props) => {
  return (
    <div className="flex flex-row flex-wrap gap-2 items-center my-4">
      {tags.map((tag) => (
        <ButtonTagColored tag={tag} key={tag.id} />
      ))}
    </div>
  );
};
