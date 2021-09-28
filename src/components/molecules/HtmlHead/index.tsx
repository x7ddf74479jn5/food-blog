import React from "react";

import { HtmlHeadBase } from "@/components/atoms/HtmlHeadBase";

// import { SITE_NAME, SITE_URL } from '../../../utils/env';

type HtmlHeadProps = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  host: string;
  siteName: string;
};

export const HtmlHead: React.FC<HtmlHeadProps> = ({ title, description, url, image, host, siteName }) => (
  <HtmlHeadBase
    indexUrl={host}
    title={title ? `${title} | ${siteName}` : siteName}
    description={description}
    url={url}
    image={image}
  />
);
