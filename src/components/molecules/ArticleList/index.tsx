import { ArticleItem } from "@/components/molecules/ArticleItem";
import type { TArticle } from "@/types";

type ArticleListProps = {
  articles: TArticle[];
};

const ArticleList: React.VFC<ArticleListProps> = ({ articles }) => {
  return (
    <section className="space-y-12">
      {articles.map((article) => (
        <ArticleItem key={article.id} article={article} />
      ))}
    </section>
  );
};

export default ArticleList;
