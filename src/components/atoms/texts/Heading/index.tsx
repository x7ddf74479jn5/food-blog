type HeadingOneProps = {
  children: React.ReactChild;
};

export const HeadingOne: React.FC<HeadingOneProps> = ({ children }) => {
  return <h1 className="flex justify-center text-4xl font-bold">{children}</h1>;
};
