import { expect, test } from "@playwright/test";

import { mockArticles, mockConfig } from "../mocks/data";

const { stock } = mockArticles;

test("search", async ({ page }) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");
  // Fill input[placeholder="Search\.\.\."]
  await page.locator("input[placeholder='Search\\.\\.\\.'] >> nth=0").fill(stock.title);

  await Promise.all([
    page.locator("input[placeholder='Search\\.\\.\\.'] >> nth=0").press("Enter"),
    page.waitForNavigation(/*{ url: 'http://localhost:3000/search?q=基本の一番だしの作り方' }*/),
  ]);

  await expect(page.locator("h1")).toContainText(stock.title);
  await expect(page.locator("h2", { hasText: stock.title })).toBeDefined();

  // Wait for the page to load
  await page.locator("a", { hasText: stock.title }).first().waitFor();

  // Go to the article page
  await Promise.all([
    page.locator("a", { hasText: stock.title }).first().click(),
    page.waitForNavigation(/*{ url: 'http://localhost:3000/articles/p97vmuno3jdn' }*/),
  ]);

  await expect(page.locator("h1")).toHaveText(stock.title);
  await expect(page).toHaveURL(`http://localhost:3000/articles/${stock.id}`);
  await expect(page).toHaveTitle(`${stock.title} | ${mockConfig.siteTitle}`);
});
