import { DefaultLayout } from "@/components/layouts";
import { ArticleSWRContainer } from "@/components/model/article";
import { fetchConfig, fetchTag } from "@/repositories";
import { getArticles } from "@/services/article";
import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { getBackLinks, urlTable } from "@/utils/paths/url";

type Props = {
  slug: string;
};

export const Tag = async ({ slug }: Props) => {
  const [tag, config] = await Promise.all([fetchTag(slug), fetchConfig()]);
  const fallbackData = await getArticles({ filters: `tags[contains]${tag.id}`, limit: 10, offset: 0 });
  const { host, siteTitle } = config;
  const heading = `タグ：${tag.name}`;
  const pageTitle = formatPageTitle(heading, siteTitle);
  const url = formatPageUrl(`${urlTable.tags}/${tag.slug}`, host);
  const backLinks = getBackLinks([urlTable.home, urlTable.categories]);
  const queryOptions = { filters: `tags[contains]${tag.id}` };

  return (
    <DefaultLayout pageTitle={pageTitle} url={url} backLinks={backLinks}>
      <div className="mb-8">
        <h1>{heading}</h1>
      </div>
      <div className="min-h-screen w-full">
        <ArticleSWRContainer fallbackData={fallbackData} queryOptions={queryOptions} />
      </div>
    </DefaultLayout>
  );
};
