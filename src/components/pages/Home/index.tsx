import { HtmlHeadBase } from "@/components/functions/meta";
import { HomeLayout } from "@/components/layouts";
import { ArticleSWRContainer } from "@/components/organisms/article";
import type { TArticleListResponse, TCategory, TConfig, TPickup, TRankedArticle, TTag } from "@/types";

export type HomeProps = {
  data: TArticleListResponse;
  categories: TCategory[];
  tags: TTag[];
  config: TConfig;
  pickup: TPickup;
  popularArticles: TRankedArticle[];
};

export const Home: React.FC<HomeProps> = ({ categories, config, data, pickup, popularArticles, tags }) => {
  const { host, siteTitle: title } = config;

  return (
    <HomeLayout
      pickup={pickup}
      url={host}
      pageTitle={title}
      config={config}
      categories={categories}
      tags={tags}
      popularArticles={popularArticles}
    >
      <HtmlHeadBase indexUrl={host} siteTitle={title} />
      <div className="mb-8">
        <h1>レシピ一覧</h1>
      </div>
      <ArticleSWRContainer fallbackData={data} />
    </HomeLayout>
  );
};
