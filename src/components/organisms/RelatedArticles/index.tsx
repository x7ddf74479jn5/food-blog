import { ArticleTipWithThumbList } from "@/components/molecules/ArticleTipList";
import type { TArticle } from "@/types/";

type Props = {
  relatedArticles: TArticle[];
};

export const RelatedArticles: React.FC<Props> = ({ relatedArticles }) => {
  return (
    <section className="flex flex-col gap-y-2 p-2 bg-gray-50 dark:bg-gray-700">
      <h2 className="px-2 pb-2 border-b-2">関連レシピ</h2>
      {relatedArticles.length > 0 ? (
        <ArticleTipWithThumbList articles={relatedArticles} />
      ) : (
        <p>関連するレシピは見つかりませんでした</p>
      )}
    </section>
  );
};
