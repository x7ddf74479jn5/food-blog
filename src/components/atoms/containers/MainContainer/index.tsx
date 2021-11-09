type MainContainerProps = {
  children: React.ReactNode;
};

export const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
  return (
    <main className="overflow-hidden flex-auto order-1 md:order-2 pb-12 mt-8 md:mt-16 mb-0 w-full max-w-prose">
      {children}
    </main>
  );
};
