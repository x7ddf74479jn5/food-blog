import NextLink from "@components/atoms/NextLink";

type SiteTitleProps = {
  size: string;
  siteTitle: string;
};

export const SiteTitle: React.FC<SiteTitleProps> = ({ size, siteTitle }) => {
  return (
    <NextLink href="/" className={`${size} font-bold text-green-500`}>
      {siteTitle}
    </NextLink>
  );
};
