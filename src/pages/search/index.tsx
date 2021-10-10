import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

import Spinner from "@/components/atoms/Spinner";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import ArticleList from "@/components/molecules/ArticleList";
import Pagination from "@/components/molecules/Pagination";
import useGetArticleListQuery from "@/hooks/useGetArticleListQuery";
import Error404 from "@/pages/404";
import type { TConfig } from "@/types/index";
import { fetchConfig } from "@/utils/fetcher";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Search: NextPage<Props> = ({ config }) => {
  const { data, error, size, setSize, isValidating } = useGetArticleListQuery({ perPage: 2 });

  if (error) return <Error404 config={config} />;

  const handleOnClick = () => {
    setSize(size + 1);
  };

  const articles = data ? data.map((r) => (r ? r.contents : [])).flat() : [];
  const totalCount = data ? data[0]?.totalCount : 0;
  const hasNextPage = totalCount ? articles.length !== totalCount : false;

  return (
    <DefaultLayout config={config}>
      <h1 className="mb-4 text-4xl font-bold">検索結果</h1>
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
    </DefaultLayout>
  );
};

type StaticProps = {
  config: TConfig;
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const config = (await fetchConfig()) as TConfig;

  return {
    props: {
      config,
    },
  };
};

export default Search;
