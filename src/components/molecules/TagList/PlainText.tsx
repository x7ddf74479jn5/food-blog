import { ButtonTagPlain } from "@/components/atoms/buttons/ButtonTag";
import type { TTag } from "@/types";

type Props = {
  tags: TTag[];
};

export const TagListPlainText: React.VFC<Props> = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {(tags || []).map((tag) => (
        <div className="wrapitem" key={tag.id}>
          <ButtonTagPlain tag={tag} />
        </div>
      ))}
    </div>
  );
};
