import Link from "next/link";

type Props = {
  href: string;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "aria-label"?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  prefetch?: boolean;
};

const NextLink: React.FC<Props> = ({ children, href, prefetch = false, ...rest }) => {
  return (
    <Link href={href} prefetch={prefetch} {...rest}>
      {children}
    </Link>
  );
};

export default NextLink;
