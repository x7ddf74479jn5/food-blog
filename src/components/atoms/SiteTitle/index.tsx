import NextLink from "@/components/atoms/NextLink";

type SiteTitleProps = {
  size: string;
  title: string;
};

export const SiteTitle: React.FC<SiteTitleProps> = ({ size, title }) => {
  return (
    <NextLink href="/" className={`${size} font-bold text-green-600`}>
      {title}
    </NextLink>
  );
};
