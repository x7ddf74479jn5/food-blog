import type { WebPage, WithContext } from "schema-dts";

import type { TConfig } from "@/types";

import { generateJsonLdScript, getCommonJsonLdFragment, transformOrganization } from "./common";

type Props = {
  config: TConfig;
};

export const WebpageJsonLd: React.FC<Props> = (props) => {
  return generateJsonLdScript("json-ld-base", props, generateJsonLd);
};

const generateJsonLd = ({ config }: Props) => {
  const { host: siteUrl, siteDescription, siteTitle } = config;
  const org = transformOrganization(config);
  const imageUrl = `${siteUrl}/images/site-logo-512x512.png`;
  const { organizationFragment, searchActionsFragment } = getCommonJsonLdFragment({ org, siteUrl });

  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    description: siteDescription,
    image: [imageUrl],
    name: siteTitle,
    potentialAction: searchActionsFragment,
    publisher: organizationFragment,
    url: siteUrl,
  };

  return JSON.stringify(jsonLd);
};
