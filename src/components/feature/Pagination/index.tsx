import { memo } from "react";

import Spinner from "@/components/ui/Spinner";

import { LoadMoreButton } from "./LoadMoreButton";

type Props = {
  hasNextPage: boolean;
  isValidating: boolean;
  onClick: () => void;
};

const Pagination: React.FC<Props> = ({ hasNextPage, isValidating, onClick: handleClick }) => {
  return (
    <>
      {hasNextPage ? (
        <div className="mt-8 flex justify-center">
          {isValidating ? <Spinner size="w-8 h-8" /> : <LoadMoreButton onClick={handleClick} />}
        </div>
      ) : null}
    </>
  );
};

export default memo(Pagination);
