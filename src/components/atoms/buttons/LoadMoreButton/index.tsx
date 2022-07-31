import { FaChevronDown } from "react-icons/fa";

type LoadMoreButtonProps = JSX.IntrinsicElements["button"];

export const LoadMoreButton: React.VFC<LoadMoreButtonProps> = ({ onClick: handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="flex flex-row gap-2 justify-center items-center py-2 px-4 text-white bg-green-700 hover:bg-green-700/90 rounded-xl border-2 border-green-600"
    >
      <FaChevronDown />
      <span>もっと読み込む</span>
    </button>
  );
};
