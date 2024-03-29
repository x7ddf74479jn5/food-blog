import { HtmlHeadBase } from "@/components/functions/meta";
import { DefaultLayout } from "@/components/layouts";
import { ArticleList } from "@/components/molecules/article";
import type { TCategory, TConfig, TPickup, TRankedArticle, TTag } from "@/types";
import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { getBackLinks, urlTable } from "@/utils/paths/url";

export type PickupProps = {
  config: TConfig;
  categories: TCategory[];
  pickup: TPickup;
  popularArticles: TRankedArticle[];
  tags: TTag[];
};

export const Pickup: React.FC<PickupProps> = ({ categories, config, pickup, popularArticles, tags }) => {
  const { host, siteTitle } = config;
  const heading = "おすすめ記事";
  const pageTitle = formatPageTitle(heading, siteTitle);
  const url = formatPageUrl(`${urlTable.pickup}`, host);
  const backLinks = getBackLinks([urlTable.home, urlTable.categories]);

  return (
    <DefaultLayout
      config={config}
      pageTitle={pageTitle}
      url={url}
      backLinks={backLinks}
      categories={categories}
      tags={tags}
      pickup={pickup}
      popularArticles={popularArticles}
    >
      <HtmlHeadBase indexUrl={host} pageTitle={pageTitle} url={url} />
      <div className="mb-8">
        <h1>{heading}</h1>
      </div>
      <div className="min-h-screen w-full">
        <section>
          <ArticleList articles={pickup.articles} />
        </section>
      </div>
    </DefaultLayout>
  );
};
