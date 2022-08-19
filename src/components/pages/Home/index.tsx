import { HtmlHeadBase } from "@/components/functions/meta";
import HomeLayout from "@/components/layouts/HomeLayout";
import { ArticleSWRContainer } from "@/components/organisms/ArticleSWRContainer";
import type { TArticleListResponse, TCategory, TConfig, TPickup, TRankedArticle } from "@/types";

export type HomeProps = {
  data: TArticleListResponse;
  categories: TCategory[];
  config: TConfig;
  pickup: TPickup;
  popularArticles: TRankedArticle[];
};

export const Home: React.FC<HomeProps> = ({ data, config, pickup, categories, popularArticles }) => {
  const { siteTitle: title, host } = config;

  return (
    <HomeLayout
      pickup={pickup}
      url={host}
      pageTitle={title}
      config={config}
      categories={categories}
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
