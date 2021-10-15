import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

import { getNewDate } from "@//utils/date/getNewDate";
import Spinner from "@/components/atoms/Spinner";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import ArticleList from "@/components/molecules/ArticleList";
import Pagination from "@/components/molecules/Pagination";
import useGetArticleListQuery from "@/hooks/useGetArticleListQuery";
import Error404 from "@/pages/404/index.page";
import type { TCategory, TConfig, TPickup } from "@/types/index";
import { fetchCategories, fetchConfig, fetchPickupArticles } from "@/utils/fetcher";
import { UrlTable } from "@/utils/paths/url";
import { getBackLinks } from "@/utils/paths/url";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Search: NextPage<Props> = ({ config, categories, pickup }) => {
  const { data, error, size, setSize, isValidating, keyword } = useGetArticleListQuery({ perPage: 2 });

  if (error) return <Error404 config={config} />;

  const handleOnClick = () => {
    setSize(size + 1);
  };

  const articles = data ? data.map((r) => (r ? r.contents : [])).flat() : [];
  const totalCount = data ? data[0]?.totalCount : 0;
  const hasNextPage = totalCount ? articles.length !== totalCount : false;

  const url = UrlTable.home;
  const title = config.siteTitle;
  const backLinks = getBackLinks([UrlTable.home]);

  return (
    <DefaultLayout
      config={config}
      pageTitle={title}
      url={url}
      backLinks={backLinks}
      categories={categories}
      pickup={pickup}
    >
      <h1 className="mb-4 text-4xl font-bold">検索結果：{keyword}</h1>
      <div className="w-full min-h-screen">
        {!data ? (
          <div className="flex fixed inset-0 justify-center items-center w-full h-screen ">
            <Spinner size="w-32 h-32" />
          </div>
        ) : articles.length > 0 ? (
          <>
            <ArticleList articles={articles} />
            <Pagination hasNextPage={hasNextPage} isValidating={isValidating} onClick={handleOnClick} />
          </>
        ) : (
          <div className="flex justify-center mt-4">レシピが見つかりませんでした。</div>
        )}
      </div>
    </DefaultLayout>
  );
};

type StaticProps = {
  config: TConfig;
  categories: TCategory[];
  pickup: TPickup;
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const [config, _categories, pickup] = await Promise.all([
    fetchConfig(),
    fetchCategories(),
    fetchPickupArticles(getNewDate()),
  ]);

  return {
    props: {
      config,
      categories: _categories,
      pickup,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default Search;
