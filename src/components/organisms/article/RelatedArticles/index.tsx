import { memo } from "react";

import { SideSectionContainer } from "@/components/atoms/containers";
import { ArticleTipWithThumbList } from "@/components/molecules/article";
import type { TArticle } from "@/types/";

type Props = {
  relatedArticles: TArticle[];
};

export const RelatedArticles: React.FC<Props> = memo(({ relatedArticles }) => {
  // console.log("relatedArticles: ", relatedArticles);

  return (
    <SideSectionContainer header="関連レシピ">
      {relatedArticles.length > 0 ? (
        <ArticleTipWithThumbList articles={relatedArticles} />
      ) : (
        <p className="text-center">関連するレシピは見つかりませんでした</p>
      )}
    </SideSectionContainer>
  );
});

RelatedArticles.displayName = "RelatedArticles";
