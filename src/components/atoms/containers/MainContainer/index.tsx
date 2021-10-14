type MainContainerProps = {
  children: React.ReactNode;
};

export const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
  return (
    <main className="overflow-hidden flex-1 order-1 md:order-2 pb-12 mt-8 md:mt-16 mb-0 max-w-prose">{children}</main>
  );
};
