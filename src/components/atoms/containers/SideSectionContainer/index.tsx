import { memo } from "react";

import NextLink from "@/components/atoms/NextLink";
import type { UrlTableValue } from "@/utils/paths/url";

type SideSectionContainer = {
  header: string;
  children: React.ReactNode;
  href?: UrlTableValue | undefined;
};

export const SideSectionContainer: React.FC<SideSectionContainer> = memo(({ children, header, href }) => {
  return (
    <section className="container bg-gray-50 p-2 dark:bg-gray-700 dark:text-white">
      {href ? (
        <NextLink href={href}>
          <h2 className="mb-2 border-b-2 px-2 pb-2">{header}</h2>
        </NextLink>
      ) : (
        <h2 className="mb-2 border-b-2 px-2 pb-2">{header}</h2>
      )}
      {children}
    </section>
  );
});

SideSectionContainer.displayName = "SideSectionContainer";
