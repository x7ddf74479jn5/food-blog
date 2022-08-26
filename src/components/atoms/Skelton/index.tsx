import { classNames } from "@/utils/css";

export const Skelton: React.FC<{ className: string }> = ({ className }) => (
  <div className={classNames("animate-pulse select-none shadow-lg bg-gray-300", className)} />
);
