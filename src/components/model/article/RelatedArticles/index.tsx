import { SideSectionContainer } from "@/components/atoms/containers";
import { getRelatedArticles } from "@/services/article";
import type { TArticle } from "@/types";

import { ArticleTipWithThumbList } from "../ArticleTipList";

type Props = {
  thisArticle: TArticle;
};

export const RelatedArticles = async ({ thisArticle }: Props) => {
  const relatedArticles = await getRelatedArticles(thisArticle);

  return (
    <SideSectionContainer header="関連レシピ">
      {relatedArticles.length > 0 ? (
        <ArticleTipWithThumbList articles={relatedArticles} />
      ) : (
        <p className="text-center">関連するレシピは見つかりませんでした</p>
      )}
    </SideSectionContainer>
  );
};
