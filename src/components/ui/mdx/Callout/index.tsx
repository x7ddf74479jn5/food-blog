import { FaExclamationCircle } from "react-icons/fa";

type CalloutProps = React.PropsWithChildren<object>;

export const Callout: React.FC<CalloutProps> = ({ children }) => {
  return (
    <div className={`my-8 flex w-full flex-row items-center justify-center gap-4 bg-yellow-100 p-4 dark:bg-yellow-900`}>
      <FaExclamationCircle className="h-6 w-6 flex-none text-yellow-300 dark:text-yellow-700 md:h-8 md:w-8" />
      <span>{children}</span>
    </div>
  );
};
