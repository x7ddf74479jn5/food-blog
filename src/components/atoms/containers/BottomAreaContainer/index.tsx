import { memo } from "react";

type BottomAreaContainerProps = {
  children: React.ReactNode;
};

export const BottomAreaContainer: React.FC<BottomAreaContainerProps> = memo(({ children }) => {
  return <div className="flex flex-col lg:flex-row gap-8 mb-16">{children}</div>;
});

BottomAreaContainer.displayName = "BottomAreaContainer";
