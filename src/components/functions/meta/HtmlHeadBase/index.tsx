import { NextSeo } from "next-seo";
import type { NextSeoProps } from "next-seo/lib/types";
import { memo } from "react";

type HtmlHeadBaseProps = {
  indexUrl: string;
  pageTitle?: string;
  siteTitle?: string;
  description?: string;
  url?: string;
  image?: string;
};

export const HtmlHeadBase: React.FC<HtmlHeadBaseProps> = memo(
  ({ description, image, indexUrl, pageTitle, siteTitle, url }) => {
    const seoProps: NextSeoProps = {
      additionalLinkTags: [
        {
          href: "/favicon/apple-touch-icon.png",
          rel: "apple-touch-icon",
          sizes: "180x180",
        },
        {
          href: "/favicon/favicon-32x32.png",
          rel: "icon",
          sizes: "32x32",
          type: "image/png",
        },
        {
          href: "/favicon/favicon-16x16.png",
          rel: "icon",
          sizes: "16x16",
          type: "image/png",
        },
        {
          href: "/favicon/favicon.ico",
          rel: "icon",
        },
        {
          href: "/favicon/site.webmanifest",
          rel: "manifest",
        },
        { color: "#5bbad5", href: "/favicon/safari-pinned-tab.svg", rel: "mask-icon" },
        {
          href: "/feed.xml",
          rel: "alternate",
          type: "application/rss+xml",
        },
        {
          href: url || indexUrl,
          rel: "canonical",
        },
      ],
      additionalMetaTags: [
        {
          content: "#00a300",
          name: "msapplication-TileColor",
        },
        {
          content: "/favicon/browserconfig.xml",
          name: "msapplication-config",
        },
        {
          content: "#fff",
          name: "theme-color",
        },
      ],
      description: description,
      openGraph: {
        description,
        title: pageTitle ?? siteTitle,
      },
      title: pageTitle,
    };

    if (seoProps.openGraph) {
      if (url) seoProps.openGraph.url = url;
      if (url && image) seoProps.openGraph.images = [{ url: image }];
    }

    return <NextSeo {...seoProps} />;
  }
);

HtmlHeadBase.displayName = "HtmlHeadBase";
