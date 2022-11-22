import { classNames } from "@/utils/css";

type Props = {
  label: string;
  children: React.ReactNode;
};

const Tooltip: React.FC<Props> = ({ children, label }) => {
  return (
    <div className="group relative inline-block cursor-pointer" role="tooltip">
      {children}
      {/* triangle */}
      <div
        className={classNames(
          "inline-block absolute z-10 text-white bg-gray-500 left-1/2 rounded-sm transform -translate-x-1/2 whitespace-nowrap",
          "opacity-0 invisible group-hover:visible group-hover:opacity-100 transition ease-in",
          "-bottom-4 h-3 w-3 rotate-45"
        )}
      />
      <div
        className={classNames(
          "inline-block absolute z-10 text-white bg-gray-500 left-1/2 rounded-sm transform -translate-x-1/2 whitespace-nowrap",
          "opacity-0 invisible group-hover:visible group-hover:opacity-100 transition ease-in",
          "-bottom-8 p-1 text-xs leading-snug"
        )}
      >
        {label}
      </div>
    </div>
  );
};

export default Tooltip;
