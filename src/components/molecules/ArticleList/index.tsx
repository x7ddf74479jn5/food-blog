import NextLink from "@/components/atoms/NextLink";
import Thumbnail from "@/components/atoms/Thumbnail";
import type { TArticle } from "@/types";

type Props = {
  articles: TArticle[];
};

const ArticleList: React.VFC<Props> = ({ articles }) => {
  return (
    <section className="space-y-12">
      {articles.map((article) => (
        <article key={article.id}>
          <div className="mb-4">
            <Thumbnail src={article.image.url} title={article.title} id={article.id} />
          </div>

          <h2 className="mb-4 text-2xl font-bold">
            <NextLink href={`/articles/${article.id}`}>{article.title}</NextLink>
          </h2>

          <p className="dark:text-gray-300 line-clamp-2">{article.description}</p>
        </article>
      ))}
    </section>
  );
};

export default ArticleList;
