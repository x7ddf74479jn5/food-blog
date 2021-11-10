import { FaExclamationCircle } from "react-icons/fa";

type Props = {
  children: React.ReactNode;
};

export const Callout: React.FC<Props> = ({ children }) => {
  return (
    <div className={`flex flex-row p-4 gap-4 justify-center items-center w-full bg-yellow-100 dark:bg-yellow-900`}>
      <FaExclamationCircle className="w-16 h-16 text-yellow-300 dark:text-yellow-700" />
      {children}
    </div>
  );
};
