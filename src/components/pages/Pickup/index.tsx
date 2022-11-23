import { DefaultLayout } from "@/components/layouts";
import { ArticleList } from "@/components/model/article/ArticleList";
import { fetchConfig } from "@/repositories";
import { getPickupArticles } from "@/services/article";
import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { getBackLinks, urlTable } from "@/utils/paths/url";

export const Pickup = async () => {
  const [config, pickup] = await Promise.all([fetchConfig(), getPickupArticles()]);
  const { host, siteTitle } = config;
  const heading = "おすすめ記事";
  const pageTitle = formatPageTitle(heading, siteTitle);
  const url = formatPageUrl(`${urlTable.pickup}`, host);
  const backLinks = getBackLinks([urlTable.home, urlTable.categories]);

  return (
    <DefaultLayout pageTitle={pageTitle} url={url} backLinks={backLinks}>
      <h1 className="mb-8">{heading}</h1>
      <section className="min-h-screen w-full">
        <ArticleList articles={pickup.articles} />
      </section>
    </DefaultLayout>
  );
};
