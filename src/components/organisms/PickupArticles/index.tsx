import { memo } from "react";

import { SideSectionContainer } from "@/components/atoms/containers/SideSectionContainer";
import { ArticleTipWithThumbList } from "@/components/molecules/ArticleTipList";
import type { TArticle } from "@/types/";

type PickupArticlesProps = {
  pickupArticles: TArticle[];
};

export const PickupArticles: React.FC<PickupArticlesProps> = memo(({ pickupArticles }) => {
  return (
    <SideSectionContainer header="PICKUP">
      {pickupArticles.length > 0 ? (
        <ArticleTipWithThumbList articles={pickupArticles} />
      ) : (
        <p className="text-center">おすすめ記事は見つかりませんでした</p>
      )}
    </SideSectionContainer>
  );
});

PickupArticles.displayName = "PickupArticles";
