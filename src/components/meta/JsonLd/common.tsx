import Script from "next/script";
import type { ImageObject, Organization, SearchAction } from "schema-dts";

import type { TConfig, TOrganization } from "@/types";
import { urlTable } from "@/utils/paths/url";

export const transformOrganization = (config: TConfig) => {
  const { officialSite, organization } = config;
  const org: TOrganization = {
    name: organization,
    url: officialSite,
  };

  return org;
};

export const generateJsonLdScript = (id: string, props: Record<string, any>, generator: (obj: any) => string) => {
  return (
    <Script
      id={id}
      type="application/ld+json"
      defer
      dangerouslySetInnerHTML={{
        __html: generator(props),
      }}
      strategy="afterInteractive"
    />
  );
};

export const getCommonJsonLdFragment = ({ org, siteUrl }: { org: TOrganization; siteUrl: string }) => {
  return {
    organizationFragment: getOrganizationFragment({ org, siteUrl }),
    searchActionsFragment: getSearchActionsFragment(siteUrl),
  };
};

const getOrganizationFragment = ({ org, siteUrl }: { org: TOrganization; siteUrl: string }) => {
  const { imageUrl, name, url } = org;
  const orgLogo: ImageObject = {
    "@type": "ImageObject",
    url: imageUrl ?? `${siteUrl}/images/site-logo-512x512.png`,
  };
  const organizationFragment: Organization = {
    "@type": "Organization",
    logo: orgLogo,
    name,
    url,
  };

  return organizationFragment;
};

const getSearchActionsFragment = (siteUrl: string) => {
  const appSiteUrl = `android-app://com.example/${siteUrl.replace(":/", "")}`;

  const generateSearchActionFragment = (baseUrl: string) =>
    ({
      "@type": "SearchAction",
      "query-input": "required name=search_term_string",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}${urlTable.search}?q={search_term_string}`,
      },
    } as const);

  const searchActionsFragment: SearchAction[] = [
    generateSearchActionFragment(siteUrl),
    generateSearchActionFragment(appSiteUrl),
  ];

  return searchActionsFragment;
};
