import { memo } from "react";

import { SiteTitle } from "@/components/atoms/SiteTitle";

type FooterProps = {
  organization: string;
  siteTitle: string;
};

const Footer: React.VFC<FooterProps> = ({ siteTitle, organization }) => {
  return (
    <footer className="flex flex-row gap-2 place-content-center py-2 mx-auto mt-auto w-full text-xs bg-gray-50 dark:bg-gray-700">
      <SiteTitle title={siteTitle} size="text-xs" />
      <span className="">©︎ 2021 {organization}</span>
    </footer>
  );
};

export default memo(Footer);
