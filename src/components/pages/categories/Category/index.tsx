import { DefaultLayout } from "@/components/layouts";
import { ArticleSWRContainer } from "@/components/model/article/ArticleSWRContainer";
import { getCategoryPageMeta } from "@/components/pages/categories/Category/meta";
import { getArticles } from "@/services/article";
import { getCategory } from "@/services/category";
import { getBackLinks, urlTable } from "@/utils/paths/url";

export type CategoryProps = {
  slug: string;
};

export const Category = async ({ slug }: CategoryProps) => {
  const category = await getCategory(slug);
  const fallbackData = await getArticles({ filters: `category[equals]${category.id}`, limit: 10, offset: 0 });
  const { title: pageTitle, url } = await getCategoryPageMeta(slug);
  const backLinks = getBackLinks([urlTable.home, urlTable.categories]);
  const queryOptions = { filters: `category[equals]${category.id}` };

  return (
    <DefaultLayout pageTitle={pageTitle} url={url} backLinks={backLinks}>
      <h1 className="mb-8">カテゴリー： {category.name}</h1>
      <div className="min-h-screen w-full">
        <ArticleSWRContainer fallbackData={fallbackData} queryOptions={queryOptions} />
      </div>
    </DefaultLayout>
  );
};
