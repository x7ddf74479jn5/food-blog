type MainContainerProps = {
  children: React.ReactNode;
};

export const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
  return <main className="overflow-hidden flex-1 order-1 md:order-2 pt-4 pb-12 max-w-prose">{children}</main>;
};
