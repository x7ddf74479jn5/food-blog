export const formatPageTitle = (pageTitle: string, siteTitle: string) => {
  return `${pageTitle} | ${siteTitle}`;
};

export const formatPageUrl = (path: string, indexUrl: string) => {
  return new URL(path, indexUrl).toString();
};
