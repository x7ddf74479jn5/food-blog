import { FaExclamationCircle } from "react-icons/fa";

type Props = {
  children: React.ReactNode;
};

export const Callout: React.FC<Props> = ({ children }) => {
  return (
    <div className={`flex flex-row my-8 p-4 gap-4 justify-center items-center w-full bg-yellow-100 dark:bg-yellow-900`}>
      <FaExclamationCircle className="flex-none w-6 md:w-8 h-6 md:h-8 text-yellow-300 dark:text-yellow-700" />
      <span>{children}</span>
    </div>
  );
};
