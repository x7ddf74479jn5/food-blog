import NextLink from "@/components/atoms/NextLink";
import Thumbnail from "@/components/atoms/Thumbnail";
import type { TArticle } from "@/types";

type Props = {
  articles: TArticle[];
};

const ArticleList: React.VFC<Props> = ({ articles }) => {
  return (
    <div className="space-y-12">
      {articles.map((article) => (
        <div key={article.id}>
          <div className="mb-4">
            <Thumbnail src={article.image.url} title={article.title} id={article.id} />
          </div>

          <h2 className="mb-4 text-2xl font-bold">
            <NextLink href={`/articles/${article.id}`}>{article.title}</NextLink>
          </h2>

          <p className="dark:text-gray-300">{article.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
