type SpinnerProps = { size: string };

const Spinner: React.FC<SpinnerProps> = ({ size }) => {
  return <div className={`${size} animate-spin rounded-full border-b-2 border-green-500`} />;
};

export default Spinner;
