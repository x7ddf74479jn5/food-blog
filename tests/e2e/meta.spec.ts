import { expect, test } from "@playwright/test";

import { mockArticles } from "../../mocks/data";

const { stock } = mockArticles;

test.describe("メタ情報が正しく設定されている", () => {
  test("/", async ({ page }) => {
    await page.goto("https://food-blog-git-develop-x7ddf74479jn5.vercel.app/");
    expect(page).toHaveTitle("Food Blog");

    const description = await page.getAttribute("meta[name='description']", "content");
    expect(description).toBe("料理レシピを紹介するブログ");

    const canonical = await page.getAttribute("link[rel='canonical']", "href");
    expect(canonical).toBe("https://food-blog-chi.vercel.app/");

    const ogpImage = await page.getAttribute("meta[property='og:image']", "content");
    expect(ogpImage).toBe("https://food-blog-chi.vercel.app/images/site-logo-512x512.png");

    const appleTouchIcon = await page.getAttribute("link[rel='apple-touch-icon']", "href");
    expect(appleTouchIcon).toBe("/favicon/apple-touch-icon.png");

    const icons = await page.locator("link[rel='icon']");
    const iconPaths = await icons.evaluateAll((icons) => {
      return icons.map((i) => i.getAttribute("href"));
    });
    iconPaths.forEach((path) => {
      expect(path).toMatch(/^\/favicon\/favicon.*/);
    });
  });

  test("/articles/[id]", async ({ page }) => {
    await page.goto(`https://food-blog-git-develop-x7ddf74479jn5.vercel.app/articles/${stock.id}`);
    expect(page).toHaveTitle(`${stock.title} | Food Blog`);
    const description = await page.getAttribute("meta[name='description']", "content");
    expect(description).toBe(stock.description);
    const ogpImage = await page.getAttribute("meta[property='og:image']", "content");
    expect(ogpImage).toBe(stock.image.url);
  });
});
