type MainContainerProps = React.PropsWithChildren<object>;

export const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
  return (
    <main className="order-1 mt-8 mb-0 w-full max-w-prose flex-auto overflow-hidden pb-12 md:order-2 md:mt-16">
      {children}
    </main>
  );
};
