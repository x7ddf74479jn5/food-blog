import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
};

const CustomLink: React.FC<Props> = ({ href, children }) => {
  const isInternalLink = href.startsWith("/") ? true : false;

  return (
    <>
      {isInternalLink ? (
        <Link href={href}>
          <a>{children}</a>
        </Link>
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )}
    </>
  );
};

export default CustomLink;
