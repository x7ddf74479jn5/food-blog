import { Feed } from "feed";
import fs from "fs";
import { marked } from "marked";

import type { TArticle, TConfig } from "@/types";
import { urlTable } from "@/utils/paths/url";

export const generatedRssFeed = (config: TConfig, articles: TArticle[]) => {
  const baseUrl = config.host;
  const date = new Date();
  const author = {
    name: config.organization,
    email: config.email,
    link: config.officialSite,
  };

  const feed = new Feed({
    title: config.siteTitle,
    description: config.siteDescription,
    id: baseUrl,
    link: baseUrl,
    language: "ja",
    image: `${baseUrl}/favicon/favicon-32x32.png`,
    copyright: `All rights reserved ${date.getFullYear()}, ${author.name}`,
    updated: date,
    feedLinks: {
      rss2: `${baseUrl}/rss/feed.xml`,
      json: `${baseUrl}/rss/feed.json`,
      atom: `${baseUrl}/rss/atom.xml`,
    },
    author: author,
  });

  articles.forEach((article) => {
    const url = `${baseUrl}/${urlTable.articles}/${article.id}`;

    feed.addItem({
      title: article.title,
      description: article.description,
      id: article.id,
      link: url,
      content: marked(article.body),
      date: new Date(article.publishedAt),
    });
  });

  fs.mkdirSync("./public/rss", { recursive: true });
  fs.writeFileSync("./public/rss/feed.xml", feed.rss2());
  fs.writeFileSync("./public/rss/atom.xml", feed.atom1());
  fs.writeFileSync("./public/rss/feed.json", feed.json1());
};
