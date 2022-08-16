import { FaChevronDown } from "react-icons/fa";

type LoadMoreButtonProps = JSX.IntrinsicElements["button"];

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick: handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="flex flex-row items-center justify-center gap-2 rounded-xl border-2 border-green-600 bg-green-700 py-2 px-4 text-white hover:bg-green-700/90"
    >
      <FaChevronDown />
      <span>もっと読み込む</span>
    </button>
  );
};
