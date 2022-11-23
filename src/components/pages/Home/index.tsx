import { FaLightbulb } from "react-icons/fa";
import { IoPodium } from "react-icons/io5";

import { ShareButtons } from "@/components/feature/ShareButtons";
import { ArticleSWRContainer, CarouselContainer } from "@/components/model/article";
import { PickupArticleCarousel } from "@/components/model/article/carousel/PickupArticleCarousel";
import { PopularArticleCarousel } from "@/components/model/article/carousel/PopularArticleCarousel";
import { CategoryListSide } from "@/components/model/category/CategoryListSide";
import { AsideContainer, MainContainer, MiddleAreaContainer } from "@/components/ui/containers";
import { fetchConfig } from "@/repositories";
import { getArticles, getPickupArticles, getPopularArticles } from "@/services/article";
import type { TPickup, TRankedArticle } from "@/types";

export const composeCarouselItems = ({
  pickup,
  popularArticles,
}: {
  pickup?: TPickup;
  popularArticles: TRankedArticle[];
}) => {
  const hasPickup = pickup && pickup.articles.length > 0;
  const hasPopularArticles = popularArticles.length > 0;
  const items = [];
  if (hasPickup) {
    items.push({
      Carousel: <PickupArticleCarousel pickup={pickup} />,
      Icon: <FaLightbulb className="h-4 w-4 text-yellow-400" />,
      description: pickup?.description,
      id: "pickup",
      label: "PICKUP",
    });
  }

  if (hasPopularArticles) {
    items.push({
      Carousel: <PopularArticleCarousel articles={popularArticles} />,
      Icon: <IoPodium className="h-4 w-4 text-yellow-400" />,
      description: "人気記事ランキング",
      id: "popular",
      label: "POPULAR",
    });
  }

  return items;
};

export const Home = async () => {
  const fallbackData = await getArticles({ limit: 10, offset: 0 });
  const [config, pickup, popularArticles] = await Promise.all([
    fetchConfig(),
    getPickupArticles(new Date()),
    getPopularArticles(),
  ]);
  const { host, siteTitle } = config;
  const carouselItems = composeCarouselItems({ pickup, popularArticles });

  return (
    <>
      {carouselItems.length > 0 && <CarouselContainer items={carouselItems} />}
      <MiddleAreaContainer>
        <AsideContainer className="order-2 md:order-1">
          <ShareButtons url={host} title={siteTitle} className="flex-row md:flex-col" />
        </AsideContainer>
        <MainContainer className="order-1 md:order-2">
          <h1 className="mb-8">レシピ一覧</h1>
          <ArticleSWRContainer fallbackData={fallbackData} />
        </MainContainer>
        <AsideContainer className="order-3">
          {/* @ts-expect-error  server component */}
          <CategoryListSide columns="grid-cols-3 sm:grid-cols-5 md:grid-cols-1" />
        </AsideContainer>
      </MiddleAreaContainer>
    </>
  );
};
