export const apiRoute = {
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

const labelTable = {
  [urlTable.home]: "レシピ一覧へ",
  [urlTable.categories]: "カテゴリー別一覧へ",
  [urlTable.tags]: "タグ別一覧へ",
} as const;

type LabelTableKey = keyof typeof labelTable;

export const getBackLinks = (paths: LabelTableKey[]): { href: string; label: string }[] => {
  return paths.map((path) => {
    return { href: path, label: labelTable[path] };
  });
};
