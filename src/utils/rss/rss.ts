import fs from "node:fs";

import { Feed } from "feed";
import { marked } from "marked";

import { getSafeDate } from "@/lib/date";
import type { TArticle, TConfig } from "@/types";
import { urlTable } from "@/utils/paths/url";

export const generatedRssFeed = (config: TConfig, articles: TArticle[]) => {
  const baseUrl = config.host;
  const date = new Date();
  const author = {
    email: config.email,
    link: config.officialSite,
    name: config.organization,
  };

  const feed = new Feed({
    author: author,
    copyright: `All rights reserved ${date.getFullYear()}, ${author.name}`,
    description: config.siteDescription,
    feedLinks: {
      atom: `${baseUrl}/rss/atom.xml`,
      json: `${baseUrl}/rss/feed.json`,
      rss2: `${baseUrl}/rss/feed.xml`,
    },
    id: baseUrl,
    image: `${baseUrl}/favicon/favicon-32x32.png`,
    language: "ja",
    link: baseUrl,
    title: config.siteTitle,
    updated: date,
  });

  articles.forEach((article) => {
    const url = `${baseUrl}/${urlTable.articles}/${article.id}`;

    feed.addItem({
      content: marked(article.body),
      date: new Date(getSafeDate(article.publishedAt)),
      description: article.description,
      id: article.id,
      link: url,
      title: article.title,
    });
  });

  fs.mkdirSync("./public/rss", { recursive: true });
  fs.writeFileSync("./public/rss/feed.xml", feed.rss2());
  fs.writeFileSync("./public/rss/atom.xml", feed.atom1());
  fs.writeFileSync("./public/rss/feed.json", feed.json1());
};
