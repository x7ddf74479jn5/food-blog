import { ButtonTagColored } from "@/components/atoms/buttons/ButtonTag";
import type { TTag } from "@/types";

type Props = {
  tags: TTag[];
};

export const TagListColored = ({ tags }: Props) => {
  return (
    <ul className="flex flex-row flex-wrap gap-2 items-center">
      {tags.map((tag) => (
        <li key={tag.id}>
          <ButtonTagColored tag={tag} />
        </li>
      ))}
    </ul>
  );
};
