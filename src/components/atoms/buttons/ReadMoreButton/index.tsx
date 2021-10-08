import { FaChevronDown } from "react-icons/fa";

type ReadMoreButtonProps = {
  handleOnClick: () => void;
};

export const ReadMoreButton: React.VFC<ReadMoreButtonProps> = ({ handleOnClick }) => {
  return (
    <button
      onClick={handleOnClick}
      className="dark:text-white dark:bg-gray-700
py-2 px-4 rounded-xl bg-gray-300 flex flex-row justify-center items-center gap-2"
    >
      <FaChevronDown />
      <span>もっと読み込む</span>
    </button>
  );
};
