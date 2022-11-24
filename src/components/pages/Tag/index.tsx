import { DefaultLayout } from "@/components/layouts";
import { ArticleSWRContainer } from "@/components/model/article";
import { fetchTag } from "@/repositories";
import { getArticles } from "@/services/article";
import { getBackLinks, urlTable } from "@/utils/paths/url";

import { getTagPageMeta } from "./meta";

type Props = {
  slug: string;
};

export const Tag = async ({ slug }: Props) => {
  const [tag, meta] = await Promise.all([fetchTag(slug), getTagPageMeta(slug)]);
  const fallbackData = await getArticles({ filters: `tags[contains]${tag.id}`, limit: 10, offset: 0 });
  const { title, url } = meta;
  const backLinks = getBackLinks([urlTable.home, urlTable.categories]);
  const queryOptions = { filters: `tags[contains]${tag.id}` };

  return (
    <DefaultLayout pageTitle={title} url={url} backLinks={backLinks}>
      <div className="mb-8">
        <h1>タグ： {tag.name}</h1>
      </div>
      <div className="min-h-screen w-full">
        <ArticleSWRContainer fallbackData={fallbackData} queryOptions={queryOptions} />
      </div>
    </DefaultLayout>
  );
};
