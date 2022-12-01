import type { BlogPosting, Person, WebPage, WithContext } from "schema-dts";

import type { TArticle, TConfig } from "@/types";
import { urlTable } from "@/utils/paths/url";

import { getCommonJsonLdFragment, transformOrganization } from "./common";

type Props = {
  article: TArticle;
  config: TConfig;
};

export const generateBlogJsonLd = ({ article, config }: Props) => {
  const { host: siteUrl } = config;
  const org = transformOrganization(config);
  const path = `${urlTable.articles}/${article.id}`;
  const url = `${siteUrl}${path}`;

  const author: Person = {
    "@type": "Person",
    name: article.writer.name,
    url: `https://twitter.com/${article.writer.twitterAccountName}`,
  };

  const webPage: WebPage = {
    "@id": url,
    "@type": "WebPage",
  };

  const { organizationFragment } = getCommonJsonLdFragment({ org, siteUrl });

  const jsonLd: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    author,
    dateModified: article.updatedAt,
    datePublished: article.publishedAt,
    description: article.description,
    headline: article.title,
    image: [article.image.url],
    mainEntityOfPage: webPage,
    name: article.title,
    publisher: organizationFragment,
    url,
  };

  return jsonLd;
};
