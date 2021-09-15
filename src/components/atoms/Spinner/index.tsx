const Spinner: React.VFC = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="w-32 h-32 rounded-full border-b-2 border-green-500 animate-spin"></div>
    </div>
  );
};

export default Spinner;
