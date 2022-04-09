import { memo } from "react";

type MiddleAreaContainerProps = {
  children: React.ReactNode;
};

export const MiddleAreaContainer: React.FC<MiddleAreaContainerProps> = memo(({ children }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-16 justify-center items-center md:items-stretch mb-16">
      {children}
    </div>
  );
});

MiddleAreaContainer.displayName = "MiddleAreaContainer";
