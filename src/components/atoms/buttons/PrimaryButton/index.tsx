import { classNames } from "@/utils/css";

type PrimaryButtonProps = {
  label: string;
  onClick: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  Icon?: React.ReactNode;
  size?: "sm" | "md";
};

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, Icon, size = "md", ...props }) => {
  return (
    <button
      {...props}
      className={classNames(
        "flex flex-row items-center justify-center  rounded-xl  border-green-600 bg-green-700 py-2 px-4 text-white hover:bg-green-700/90",
        size === "sm" ? "text-sm gap-1 border-2 py-1 px-2" : "text-base gap-2 border-2 py-2 px-4"
      )}
    >
      <>
        {Icon && Icon}
        <span>{label}</span>
      </>
    </button>
  );
};
