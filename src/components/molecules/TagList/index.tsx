import { ButtonTagColored } from "@/components/atoms/buttons/ButtonTag";
import type { TTag } from "@/types";

type Props = {
  tags: TTag[];
};

const TagList = ({ tags }: Props) => {
  return (
    <div className="flex flex-row gap-2 items-center my-4">
      <span>タグ：</span>
      {tags.map((tag) => (
        <div key={tag.id} className="">
          <ButtonTagColored tag={tag} />
        </div>
      ))}
    </div>
  );
};

export default TagList;
