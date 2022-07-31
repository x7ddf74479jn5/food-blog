type MainContainerProps = React.PropsWithChildren<object>;

export const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
  return (
    <main className="overflow-hidden flex-auto order-1 pb-12 mt-8 mb-0 w-full max-w-prose md:order-2 md:mt-16">
      {children}
    </main>
  );
};
