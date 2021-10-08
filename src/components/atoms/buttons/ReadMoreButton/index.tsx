import { FaChevronDown } from "react-icons/fa";

type ReadMoreButtonProps = {
  handleOnClick: () => void;
};

export const ReadMoreButton: React.VFC<ReadMoreButtonProps> = ({ handleOnClick }) => {
  return (
    <button
      onClick={handleOnClick}
      className="flex flex-row gap-2 justify-center items-center py-2 px-4 text-white bg-green-700 hover:bg-opacity-90 rounded-xl border-2 border-green-600"
    >
      <FaChevronDown />
      <span>もっと読み込む</span>
    </button>
  );
};
