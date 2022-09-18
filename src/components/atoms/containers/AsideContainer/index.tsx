import { memo } from "react";

import { classNames } from "@/utils/css";

type AsideContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export const AsideContainer: React.FC<AsideContainerProps> = memo(({ children, className }) => {
  return (
    <aside
      className={classNames(
        "flex flex-1 flex-col gap-y-8 mt-16 h-auto w-full min-w-max  items-center lg:w-1/3",
        className
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex md:sticky md:top-16">{children}</div>
      </div>
    </aside>
  );
});

AsideContainer.displayName = "AsideContainer";
