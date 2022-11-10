type MiddleAreaContainerProps = React.PropsWithChildren<object>;

export const MiddleAreaContainer: React.FC<MiddleAreaContainerProps> = ({ children }) => {
  return (
    <div className="mb-16 mt-8 flex flex-col items-center justify-center gap-4 md:flex-row md:items-stretch md:gap-16">
      {children}
    </div>
  );
};
