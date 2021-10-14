type BottomAreaContainerProps = {
  children: React.ReactNode;
};

export const BottomAreaContainer: React.FC<BottomAreaContainerProps> = ({ children }) => {
  return <div className="flex flex-col lg:flex-row gap-8 mb-16">{children}</div>;
};
