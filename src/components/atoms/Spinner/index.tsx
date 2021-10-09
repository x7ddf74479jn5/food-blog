type SpinnerProps = { size: string };

const Spinner: React.VFC<SpinnerProps> = ({ size }) => {
  return <div className={`${size} rounded-full border-b-2 border-green-500 animate-spin`} />;
};

export default Spinner;
