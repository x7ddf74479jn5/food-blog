type Props = {
  hasNextPage: boolean;
  loadMoreRef: (node: HTMLParagraphElement) => void;
};

const Pagination: React.FC<Props> = ({ hasNextPage, loadMoreRef }: Props) => {
  return (
    <>
      {hasNextPage ? (
        <p {...{ ref: loadMoreRef }} className="py-4 text-center dark:text-gray-500">
          Loading...
        </p>
      ) : null}
    </>
  );
};

export default Pagination;
