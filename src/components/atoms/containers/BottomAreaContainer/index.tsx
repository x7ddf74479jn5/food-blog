type BottomAreaContainerProps = React.PropsWithChildren<object>;

export const BottomAreaContainer: React.FC<BottomAreaContainerProps> = ({ children }) => {
  return <div className="flex flex-col gap-8 mb-16 lg:flex-row">{children}</div>;
};
``;
