import dynamic from "next/dynamic";

import type { TPickup, TRankedArticle } from "@/types";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const PickupArticleCarousel = dynamic(() =>
  import("@/components/organisms/PickupArticleCarousel").then((mod) => mod.PickupArticleCarousel)
);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const PopularArticleCarousel = dynamic(() =>
  import("@/components/organisms/PopularArticleCarousel").then((mod) => mod.PopularArticleCarousel)
);

type CarouselContainerProps = { pickup: TPickup; popularArticles: TRankedArticle[] };

export const CarouselContainer: React.FC<CarouselContainerProps> = ({ pickup, popularArticles }) => {
  if (pickup.articles.length > 0) {
    return (
      <div className="mt-8 px-0 md:mt-16 md:px-16">
        <PickupArticleCarousel pickup={pickup} />
      </div>
    );
  }

  if (popularArticles.length > 0) {
    return (
      <div className="mt-8 px-0 md:mt-16 md:px-16">
        <PopularArticleCarousel articles={popularArticles} />
      </div>
    );
  }

  return null;
};
