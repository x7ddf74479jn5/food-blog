type Table = {
  [key: string]: string;
};

export const UrlTable = {
  home: "/",
  root: "/",
  articles: "/articles",
  categories: "/articles/categories",
  tags: "/articles/tags",
  preview: "/preview",
};

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
