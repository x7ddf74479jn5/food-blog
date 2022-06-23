import { memo } from "react";

import { SideSectionContainer } from "@/components/atoms/containers/SideSectionContainer";
import { ArticleTipWithThumbList } from "@/components/molecules/ArticleTipList";
import type { TRankedArticle } from "@/types/";

type Props = {
  popularArticles: TRankedArticle[];
};

export const PopularArticles: React.FC<Props> = memo(({ popularArticles }) => {
  return (
    <SideSectionContainer header="人気レシピ">
      {popularArticles.length > 0 ? (
        <ArticleTipWithThumbList articles={popularArticles} />
      ) : (
        <p className="text-center">レシピは見つかりませんでした</p>
      )}
    </SideSectionContainer>
  );
});

PopularArticles.displayName = "PopularArticles";
