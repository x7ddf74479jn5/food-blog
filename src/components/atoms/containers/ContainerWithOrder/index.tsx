type ContainerWithOrderProps = {
  children: React.ReactNode;
  order: string;
};

export const ContainerWithOrder: React.FC<ContainerWithOrderProps> = ({ order, children }) => {
  return <div className={`flex flex-col ${order} items-center w-full`}>{children} </div>;
};
