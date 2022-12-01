import { SideSectionContainer } from "@/components/ui/containers";
import { getPopularArticles } from "@/services/article";
import { urlTable } from "@/utils/paths/url";

import { ArticleTipWithThumbList } from "../ArticleTipList";

export const PopularArticles = async () => {
  const popularArticles = await getPopularArticles();

  return (
    <SideSectionContainer header="人気レシピ" href={urlTable.popular}>
      {popularArticles.length > 0 ? (
        <ArticleTipWithThumbList articles={popularArticles} />
      ) : (
        <p className="text-center">レシピは見つかりませんでした</p>
      )}
    </SideSectionContainer>
  );
};
