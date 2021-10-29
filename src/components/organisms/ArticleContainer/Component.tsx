import ArticleList from "@/components/molecules/ArticleList";
import Pagination from "@/components/molecules/Pagination";
import useGetArticleListQuery from "@/hooks/useGetArticleListQuery";

export const Component: React.VFC = () => {
  const { data, error, size, setSize, isValidating } = useGetArticleListQuery({
    perPage: 2,
    options: { suspense: true },
  });
  // const ArticleList = dynamic(() => import("@/components/molecules/ArticleList"),{ssr:false});
  const handleOnClick = () => {
    setSize(size + 1);
  };

  const articles = data ? data.map((r) => (r ? r.contents : [])).flat() : [];
  const totalCount = data ? data[0]?.totalCount : 0;
  const hasNextPage = totalCount ? articles.length !== totalCount : false;

  if (error) return <div className="flex justify-center mt-16">エラーが発生しました。</div>;

  if (articles.length === 0) return <div className="flex justify-center mt-16">レシピが見つかりませんでした。</div>;

  return (
    <>
      <ArticleList articles={articles} />
      <Pagination hasNextPage={hasNextPage} isValidating={isValidating} onClick={handleOnClick} />
    </>
  );
};

export default Component;
