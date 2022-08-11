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
      className={`flex flex-1 flex-col ${_side} h-auto w-full min-w-max items-center  gap-y-8 md:mt-16 lg:w-1/3 ${className}`}
    >
      <div className="flex h-full flex-col">
        <div className="flex md:sticky md:top-16">{children}</div>
      </div>
    </aside>
  );
});

AsideContainer.displayName = "AsideContainer";
