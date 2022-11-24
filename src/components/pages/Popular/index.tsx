import { DefaultLayout } from "@/components/layouts";
import { ArticleList } from "@/components/model/article/ArticleList";
import { getPopularArticles } from "@/services/article";
import { getBackLinks, urlTable } from "@/utils/paths/url";

import { getPopularPageMeta } from "./meta";

export const Popular = async () => {
  const [meta, popularArticles] = await Promise.all([getPopularPageMeta(), getPopularArticles()]);
  const { url, title } = meta;

  const backLinks = getBackLinks([urlTable.home, urlTable.categories]);

  return (
    <DefaultLayout pageTitle={title} url={url} backLinks={backLinks}>
      <h1 className="mb-8">"人気記事"</h1>
      <section className="min-h-screen w-full">
        <ArticleList articles={popularArticles} />
      </section>
    </DefaultLayout>
  );
};
