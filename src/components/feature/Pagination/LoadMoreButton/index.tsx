import { FaChevronDown } from "react-icons/fa";

import { PrimaryButton } from "@/components/ui/buttons";

type LoadMoreButtonProps = {
  onClick: () => void;
};

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = (props) => (
  <PrimaryButton label="もっと読み込む" Icon={<FaChevronDown />} {...props} size="md" />
);
