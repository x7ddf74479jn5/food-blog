import Link from "next/link";

type Props = {
  href: string;
  className?: string;
  "aria-label"?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  prefetch?: boolean;
};

const NextLink: React.FC<Props> = ({ children, prefetch = false, ...rest }) => {
  return (
    <Link prefetch={prefetch} {...rest}>
      {children}
    </Link>
  );
};

export default NextLink;
