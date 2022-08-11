type BottomAreaContainerProps = React.PropsWithChildren<object>;

export const BottomAreaContainer: React.FC<BottomAreaContainerProps> = ({ children }) => {
  return <div className="mb-16 flex flex-col gap-8 lg:flex-row">{children}</div>;
};
``;
