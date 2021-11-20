import type { Obj } from "@/types";

type Table = Obj<string>;

export const apiRoute = {
  apiSearch: "/api/search",
  apiPreview: "/api/preview",
  apiArticles: "/api/articles",
} as const;

export const urlTable = {
  home: "/",
  root: "/",
  articles: "/articles",
  categories: "/articles/categories",
  tags: "/articles/tags",
  preview: "/preview",
  search: "/search",
} as const;

const labelTable: Table = {
  "/": "レシピ一覧へ",
  "/articles/categories": "カテゴリー別一覧へ",
  "/articles/tags": "タグ別一覧へ",
};

export const getBackLinks = (paths: string[]): { href: string; label: string }[] => {
  return paths.map((path) => {
    return { href: path, label: labelTable[path] };
  });
};
