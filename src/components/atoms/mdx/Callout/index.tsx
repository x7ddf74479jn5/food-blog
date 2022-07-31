import { FaExclamationCircle } from "react-icons/fa";

type CalloutProps = React.PropsWithChildren<object>;

export const Callout: React.FC<CalloutProps> = ({ children }) => {
  return (
    <div className={`flex flex-row my-8 p-4 gap-4 justify-center items-center w-full bg-yellow-100 dark:bg-yellow-900`}>
      <FaExclamationCircle className="flex-none w-6 h-6 text-yellow-300 dark:text-yellow-700 md:w-8 md:h-8" />
      <span>{children}</span>
    </div>
  );
};
