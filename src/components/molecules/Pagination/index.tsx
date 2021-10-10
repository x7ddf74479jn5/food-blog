import { ReadMoreButton } from "@/components/atoms/buttons/ReadMoreButton/index";
import Spinner from "@/components/atoms/Spinner";

type Props = {
  hasNextPage: boolean;
  isValidating: boolean;
  onClick: () => void;
};

const Pagination: React.FC<Props> = ({ hasNextPage, isValidating, onClick }: Props) => {
  return (
    <>
      {hasNextPage ? (
        <div className="flex justify-center mt-8">
          {isValidating ? <Spinner size="w-8 h-8" /> : <ReadMoreButton handleOnClick={onClick} />}
        </div>
      ) : null}
    </>
  );
};

export default Pagination;
