import { SideSectionContainer } from "@/components/atoms/containers";
import { getPopularArticles } from "@/services/article";

import { ArticleTipWithThumbList } from "../ArticleTipList";

export const PopularArticles = async () => {
  const popularArticles = await getPopularArticles();

  return (
    <SideSectionContainer header="人気レシピ" href="/articles/popular">
      {popularArticles.length > 0 ? (
        <ArticleTipWithThumbList articles={popularArticles} />
      ) : (
        <p className="text-center">レシピは見つかりませんでした</p>
      )}
    </SideSectionContainer>
  );
};
