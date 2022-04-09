import { memo } from "react";

type SideSectionContainer = {
  header: string;
  children: React.ReactNode;
};

export const SideSectionContainer: React.FC<SideSectionContainer> = memo(({ header, children }) => {
  return (
    <section className="container p-2 dark:text-white bg-gray-50 dark:bg-gray-700">
      <h2 className="px-2 pb-2 mb-2 border-b-2">{header}</h2>
      {children}
    </section>
  );
});

SideSectionContainer.displayName = "SideSectionContainer";
