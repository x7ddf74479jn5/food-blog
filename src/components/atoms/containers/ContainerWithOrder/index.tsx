type ContainerWithOrderProps = {
  children: React.ReactNode;
  order: string;
  className?: string;
};

export const ContainerWithOrder: React.FC<ContainerWithOrderProps> = ({ order, children, className = "" }) => {
  return <div className={`flex flex-col ${order} items-center w-full ${className}`}>{children} </div>;
};
