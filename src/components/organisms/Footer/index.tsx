import { memo } from "react";

import { SiteTitle } from "@/components/atoms/SiteTitle";

type FooterProps = {
  organization: string;
  siteTitle: string;
};

const Footer: React.VFC<FooterProps> = ({ siteTitle, organization }) => {
  return (
    <footer className="mx-auto mt-auto flex w-full flex-row place-content-center gap-2 bg-gray-50 py-2 text-xs dark:bg-gray-700">
      <SiteTitle title={siteTitle} size="text-xs" />
      <span className="">©︎ 2021 {organization}</span>
    </footer>
  );
};

export default memo(Footer);
