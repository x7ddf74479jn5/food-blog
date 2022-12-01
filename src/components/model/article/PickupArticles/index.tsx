import { SideSectionContainer } from "@/components/ui/containers";
import { getPickupArticles } from "@/services/article";
import { urlTable } from "@/utils/paths/url";

import { ArticleTipWithThumbList } from "../ArticleTipList";

export const PickupArticles = async () => {
  const pickup = await getPickupArticles();

  return (
    <SideSectionContainer header="PICKUP" href={urlTable.pickup}>
      {pickup?.articles.length > 0 ? (
        <ArticleTipWithThumbList articles={pickup.articles} />
      ) : (
        <p className="text-center">おすすめ記事は見つかりませんでした</p>
      )}
    </SideSectionContainer>
  );
};
