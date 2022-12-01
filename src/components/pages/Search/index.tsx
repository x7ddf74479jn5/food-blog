import { DefaultLayout } from "@/components/layouts";
import { ArticleSWRContainer } from "@/components/model/article/ArticleSWRContainer";
import { getSearchPageMeta } from "@/components/pages/Search/meta";
import { getBackLinks, urlTable } from "@/utils/paths/url";

import { SearchedQueryOptions, SearchPageTitle } from "./SearchResult";

export const Search = async () => {
  const { title, url } = await getSearchPageMeta();
  const backLinks = getBackLinks([urlTable.home, urlTable.categories]);

  return (
    <DefaultLayout pageTitle={title} url={url} backLinks={backLinks}>
      <div className="mb-8 flex flex-col space-y-4">
        <SearchPageTitle />
        <SearchedQueryOptions />
      </div>
      <div className="w-full">
        <ArticleSWRContainer />
      </div>
    </DefaultLayout>
  );
};
