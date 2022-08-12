import { expect, test } from "@playwright/test";

import { mockArticles, mockConfig } from "../../mocks/data";

const { stock } = mockArticles;

test("search", async ({ page }) => {
  // Go to staging URL
  await page.goto("https://food-blog-git-develop-x7ddf74479jn5.vercel.app/");
  // Fill input[placeholder="Search\.\.\."]
  await page.locator("input[placeholder='Search\\.\\.\\.'] >> nth=0").fill(stock.title);

  await Promise.all([
    page.locator("input[placeholder='Search\\.\\.\\.'] >> nth=0").press("Enter"),
    page.waitForNavigation(/*{ url: 'https://food-blog-git-develop-x7ddf74479jn5.vercel.app//search?q=基本の一番だしの作り方' }*/),
  ]);

  await expect(page.locator("h1")).toContainText(stock.title);
  await expect(page.locator("h2", { hasText: stock.title })).toBeDefined();

  // Wait for the page to load
  await page.locator("a", { hasText: stock.title }).first().waitFor();

  // Go to the article page
  await Promise.all([
    page.locator("a", { hasText: stock.title }).first().click(),
    page.waitForNavigation(/*{ url: 'https://food-blog-git-develop-x7ddf74479jn5.vercel.app//articles/p97vmuno3jdn' }*/),
  ]);

  await expect(page.locator("h1")).toHaveText(stock.title);
  await expect(page).toHaveURL(`https://food-blog-git-develop-x7ddf74479jn5.vercel.app/articles/${stock.id}`);
  await expect(page).toHaveTitle(`${stock.title} | ${mockConfig.siteTitle}`);
});
