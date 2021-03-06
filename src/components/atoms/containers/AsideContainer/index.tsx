import { memo } from "react";

type AsideContainerProps = {
  children: React.ReactNode;
  className?: string;
  side: "left" | "right";
};

export const AsideContainer: React.FC<AsideContainerProps> = memo(({ children, side, className }) => {
  const _side = side === "left" ? "order-2 md:order-1 " : "order-3";
  return (
    <aside
      className={`flex flex-col flex-1 ${_side} gap-y-8 items-center md:mt-16 w-full  min-w-max lg:w-1/3 h-auto ${className}`}
    >
      <div className="flex flex-col h-full">
        <div className="flex md:sticky md:top-16">{children}</div>
      </div>
    </aside>
  );
});

AsideContainer.displayName = "AsideContainer";
