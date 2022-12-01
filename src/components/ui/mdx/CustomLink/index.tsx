import Link from "next/link";
import type { ComponentPropsWithoutRef, FC, PropsWithChildren } from "react";

type CustomLinkProps = PropsWithChildren<ComponentPropsWithoutRef<"a">>;

export const CustomLink: FC<CustomLinkProps> = ({ children, href = "" }) => {
  const isInternalLink = href.startsWith("/");

  return (
    <>
      {isInternalLink ? (
        <Link href={href}>{children}</Link>
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )}
    </>
  );
};
