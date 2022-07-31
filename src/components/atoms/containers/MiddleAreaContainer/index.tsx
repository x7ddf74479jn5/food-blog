type MiddleAreaContainerProps = React.PropsWithChildren<object>;

export const MiddleAreaContainer: React.FC<MiddleAreaContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center mb-16 md:flex-row md:gap-16 md:items-stretch">
      {children}
    </div>
  );
};
