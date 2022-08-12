import { memo } from "react";

type ContainerWithOrderProps = {
  children: React.ReactNode;
  order: string;
  className?: string;
};

export const ContainerWithOrder: React.FC<ContainerWithOrderProps> = memo(({ order, children, className = "" }) => {
  return <div className={`flex flex-col ${order} w-full items-center space-y-8 ${className}`}>{children} </div>;
});

ContainerWithOrder.displayName = "ContainerWithOrder";
