import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

// import Spinner from "@/components/atoms/Spinner";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import ArticleList from "@/components/molecules/ArticleList";
// import Pagination from "@/components/molecules/Pagination";
import useGetArticleListQuery from "@/hooks/useGetArticleListQuery";
// import usePagination from "@/hooks/usePagination/index";
import type { TConfig } from "@/types/index";
import { fetchConfig } from "@/utils/fetcher";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Search: NextPage<Props> = ({ config }) => {
  const {
    data,
    size,
    setSize,
    // isValidating
  } = useGetArticleListQuery({ perPage: 2 });

  const handleOnClick = () => {
    setSize(size + 1);
  };

  const articles = data ? data.map((r) => (r ? r.contents : [])).flat() : [];
  const totalCount = data ? data[0]?.totalCount : null;
  const hasNextPage = totalCount ? articles.length !== totalCount : false;
  // const { loadMoreRef } = usePagination({ onIntersect: handleOnClick, enabled: hasNextPage });

  // if (!data) return <Spinner />;

  return (
    <DefaultLayout config={config}>
      <h1 className="mb-4 text-4xl font-bold">検索結果</h1>
      {articles.length > 0 ? (
        <>
          <ArticleList articles={articles} />
          {hasNextPage ? <button onClick={handleOnClick}>loadmore</button> : null}
          {/* <Pagination hasNextPage={hasNextPage} loadMoreRef={loadMoreRef} /> */}
        </>
      ) : (
        <div className="flex justify-center mt-4">レシピが見つかりませんでした。</div>
      )}
    </DefaultLayout>
    // <DefaultLayout config={config}>
    //   <h1 className="mb-4 text-4xl font-bold">検索結果</h1>
    //   {isValidating ? (
    //     <Spinner />
    //   ) : articles.length > 0 ? (
    //     <>
    //       <ArticleList articles={articles} />
    //       <button onClick={handleOnClick} className="py-4 text-center dark:text-gray-500">
    //         もっと読み込む
    //       </button>
    //       {/* <Pagination hasNextPage={hasNextPage} loadMoreRef={loadMoreRef} /> */}
    //     </>
    //   ) : (
    //     <div className="flex justify-center mt-4">レシピが見つかりませんでした。</div>
    //   )}
    // </DefaultLayout>
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
