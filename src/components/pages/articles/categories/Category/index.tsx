import { DefaultLayout } from "@/components/layouts";
import { ArticleSWRContainer } from "@/components/model/article";
import { fetchConfig } from "@/repositories";
import { getArticles } from "@/services/article";
import { getCategory } from "@/services/category";
import { formatPageTitle } from "@/utils/formatter";
import { getBackLinks, urlTable } from "@/utils/paths/url";

export type CategoryProps = {
  slug: string;
};

export const Category = async ({ slug }: CategoryProps) => {
  const [config, category] = await Promise.all([fetchConfig(), getCategory(slug)]);
  const fallbackData = await getArticles({ filters: `category[equals]${category.id}`, limit: 10, offset: 0 });
  const { host, siteTitle } = config;
  const heading = `カテゴリー：${category.name}`;
  const pageTitle = formatPageTitle(heading, siteTitle);
  const url = new URL(`${urlTable.categories}/${category.slug}`, host).toString();
  const backLinks = getBackLinks([urlTable.home, urlTable.categories]);
  const queryOptions = { filters: `category[equals]${category.id}` };

  return (
    <DefaultLayout pageTitle={pageTitle} url={url} backLinks={backLinks}>
      <h1 className="mb-8">{heading}</h1>
      <div className="min-h-screen w-full">
        <ArticleSWRContainer fallbackData={fallbackData} queryOptions={queryOptions} />
      </div>
    </DefaultLayout>
  );
};
