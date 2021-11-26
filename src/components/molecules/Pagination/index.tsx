import { LoadMoreButton } from "@/components/atoms/buttons/LoadMoreButton/index";
import Spinner from "@/components/atoms/Spinner";

type Props = {
  hasNextPage: boolean;
  isValidating: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Pagination: React.FC<Props> = ({ hasNextPage, isValidating, onClick: handleClick }: Props) => {
  return (
    <>
      {hasNextPage ? (
        <div className="flex justify-center mt-8">
          {isValidating ? <Spinner size="w-8 h-8" /> : <LoadMoreButton onClick={handleClick} />}
        </div>
      ) : null}
    </>
  );
};

export default Pagination;
