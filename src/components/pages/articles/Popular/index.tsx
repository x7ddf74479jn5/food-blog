import { HtmlHeadBase } from "@/components/functions/meta";
import { DefaultLayout } from "@/components/layouts";
import { ArticleList } from "@/components/molecules/article";
import type { TCategory, TConfig, TPickup, TRankedArticle, TTag } from "@/types";
import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { getBackLinks, urlTable } from "@/utils/paths/url";

export type PopularProps = {
  config: TConfig;
  categories: TCategory[];
  pickup: TPickup;
  tags: TTag[];

  popularArticles: TRankedArticle[];
};

export const Popular: React.FC<PopularProps> = ({ categories, config, pickup, popularArticles, tags }) => {
  const { host, siteTitle } = config;
  const heading = "人気記事";
  const pageTitle = formatPageTitle(heading, siteTitle);
  const url = formatPageUrl(`${urlTable.popular}`, host);
  const backLinks = getBackLinks([urlTable.home, urlTable.categories]);

  return (
    <DefaultLayout
      config={config}
      pageTitle={pageTitle}
      url={url}
      backLinks={backLinks}
      tags={tags}
      categories={categories}
      pickup={pickup}
      popularArticles={popularArticles}
    >
      <HtmlHeadBase indexUrl={host} pageTitle={pageTitle} url={url} />
      <div className="mb-8">
        <h1>{heading}</h1>
      </div>
      <div className="min-h-screen w-full">
        <section>
          <ArticleList articles={popularArticles} />
        </section>
      </div>
    </DefaultLayout>
  );
};
