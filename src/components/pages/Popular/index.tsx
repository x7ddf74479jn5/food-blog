import { DefaultLayout } from "@/components/layouts";
import { ArticleList } from "@/components/model/article/ArticleList";
import { fetchConfig } from "@/repositories";
import { getPopularArticles } from "@/services/article";
import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { getBackLinks, urlTable } from "@/utils/paths/url";

export const Popular = async () => {
  const [config, popularArticles] = await Promise.all([fetchConfig(), getPopularArticles()]);
  const { host, siteTitle } = config;
  const heading = "人気記事";
  const pageTitle = formatPageTitle(heading, siteTitle);
  const url = formatPageUrl(`${urlTable.popular}`, host);
  const backLinks = getBackLinks([urlTable.home, urlTable.categories]);

  return (
    <DefaultLayout pageTitle={pageTitle} url={url} backLinks={backLinks}>
      <h1 className="mb-8">{heading}</h1>
      <section className="min-h-screen w-full">
        <ArticleList articles={popularArticles} />
      </section>
    </DefaultLayout>
  );
};
