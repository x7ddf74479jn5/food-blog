import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useRouter } from "next/router";
import type { TArticleListResponse, TConfig } from "src/types";
import useSWRImmutable from "swr/immutable";

import Spinner from "@/components/atoms/Spinner";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import ArticleList from "@/components/molecules/ArticleList";
import { fetchConfig } from "@/utils/fetcher";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Search: NextPage<Props> = ({ config }) => {
  const router = useRouter();

  const { q, offset } = router.query;

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWRImmutable<TArticleListResponse, Error>(
    q ? `/api/search?q=${q}&offset=${offset ?? 0}` : null,
    fetcher
  );

  const articles = data?.contents ?? [];

  return (
    <DefaultLayout config={config}>
      <h1 className="mb-4 text-4xl font-bold">検索結果</h1>
      {!data ? (
        <Spinner />
      ) : articles?.length > 0 ? (
        <ArticleList articles={articles} />
      ) : (
        <div className="flex justify-center mt-4">レシピが見つかりませんでした</div>
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
