type MainContainerProps = {
  className: string;
};

export const MainContainer: React.FC<React.PropsWithChildren<MainContainerProps>> = ({ children, className }) => {
  return (
    <main
      className={`mb-0 mt-8 w-full max-w-md flex-auto overflow-hidden px-0 pb-12 md:mt-16 md:max-w-2xl md:px-8 lg:px-16 ${className}`}
    >
      {children}
    </main>
  );
};
