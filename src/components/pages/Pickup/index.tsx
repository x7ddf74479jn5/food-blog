import { DefaultLayout } from "@/components/layouts";
import { ArticleList } from "@/components/model/article/ArticleList";
import { getPickupPageMeta } from "@/components/pages/Pickup/meta";
import { getPickupArticles } from "@/services/article";
import { getBackLinks, urlTable } from "@/utils/paths/url";

export const Pickup = async () => {
  const [meta, pickup] = await Promise.all([getPickupPageMeta(), getPickupArticles()]);
  const { title, url } = meta;
  const backLinks = getBackLinks([urlTable.home, urlTable.categories]);

  return (
    <DefaultLayout pageTitle={title} url={url} backLinks={backLinks}>
      <h1 className="mb-8">おすすめ記事</h1>
      <section className="min-h-screen w-full">
        <ArticleList articles={pickup.articles} />
      </section>
    </DefaultLayout>
  );
};
