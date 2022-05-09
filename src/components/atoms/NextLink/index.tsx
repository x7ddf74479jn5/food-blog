import Link from "next/link";

type Props = {
  href: string;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "aria-label"?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

const NextLink: React.FC<Props> = ({ href, children, ...rest }: Props) => {
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  );
};

export default NextLink;
