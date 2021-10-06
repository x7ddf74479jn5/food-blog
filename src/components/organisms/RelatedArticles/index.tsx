import { ArticleTipWithThumbList } from "@/components/molecules/ArticleTipList";
import type { TArticle } from "@/types/";

type Props = {
  relatedArticles: TArticle[];
};

export const RelatedArticles: React.FC<Props> = ({ relatedArticles }) => {
  return (
    <div className="">
      <h2 className="">関連レシピ</h2>
      {relatedArticles.length > 0 ? (
        <ArticleTipWithThumbList articles={relatedArticles} />
      ) : (
        <p>関連するレシピは見つかりませんでした</p>
      )}
    </div>
  );
};
