type MainContainerProps = {
  className: string;
};

export const MainContainer: React.FC<React.PropsWithChildren<MainContainerProps>> = ({ children, className }) => {
  return (
    <main className={`mb-0 mt-8 w-full max-w-prose flex-auto overflow-hidden pb-12 md:mt-16 ${className}`}>
      {children}
    </main>
  );
};
