import { NextSeo } from "next-seo";
import type { NextSeoProps } from "next-seo/lib/types";
import React from "react";

type HtmlHeadBaseProps = {
  indexUrl: string;
  title: string;
  description?: string;
  url: string;
  image: string;
};

export const HtmlHeadBase: React.FC<HtmlHeadBaseProps> = ({ title, description, url, image }) => {
  const seoProps: NextSeoProps = {
    title,
    description: description,
    openGraph: {
      title,
      description,
    },
    additionalLinkTags: [
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/favicon/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon/favicon-16x16.png",
      },
      {
        rel: "icon",
        href: "/favicon/favicon.ico",
      },
      {
        rel: "manifest",
        href: "/favicon/site_manifest.json",
      },
      { rel: "mask-icon", href: "/favicon/safari-pinned-tab.svg", color: "#5bbad5" },
      {
        rel: "alternate",
        type: "application/rss+xml",
        href: "/feed.xml",
      },
      {
        rel: "canonical",
        href: url,
      },
    ],
    additionalMetaTags: [
      {
        name: "msapplication-TileColor",
        content: "#00a300",
      },
      {
        name: "msapplication-config",
        content: "/favicon/browserconfig.xml",
      },
      {
        name: "theme-color",
        content: "#fff",
      },
    ],
  };

  if (seoProps.openGraph) {
    seoProps.openGraph.url = url;
    seoProps.openGraph.images = [{ url: image }];
  }

  return <NextSeo {...seoProps} />;
};
