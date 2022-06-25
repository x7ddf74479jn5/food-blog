import { memo } from "react";

import NextLink from "@/components/atoms/NextLink";
import type { UrlTableValue } from "@/utils/paths/url";

type SideSectionContainer = {
  header: string;
  children: React.ReactNode;
  href?: UrlTableValue | undefined;
};

export const SideSectionContainer: React.FC<SideSectionContainer> = memo(({ header, href, children }) => {
  return (
    <section className="container p-2 dark:text-white bg-gray-50 dark:bg-gray-700">
      {href ? (
        <NextLink href={href}>
          <h2 className="px-2 pb-2 mb-2 border-b-2">{header}</h2>
        </NextLink>
      ) : (
        <h2 className="px-2 pb-2 mb-2 border-b-2">{header}</h2>
      )}
      {children}
    </section>
  );
});

SideSectionContainer.displayName = "SideSectionContainer";
