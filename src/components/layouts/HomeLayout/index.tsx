import dynamic from "next/dynamic";
import { memo, useMemo } from "react";

import { AsideContainer } from "@/components/atoms/containers/AsideContainer";
import { MainContainer } from "@/components/atoms/containers/MainContainer";
import { MiddleAreaContainer } from "@/components/atoms/containers/MiddleAreaContainer";
import { RootLayout } from "@/components/layouts/RootLayout";
import { CategoryListSide } from "@/components/molecules/CategoryListSide";
import { useMedia } from "@/hooks/useMedia";
import type { TCategory, TConfig, TPickup, TRankedArticle } from "@/types";

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

const CarouselContainer: React.FC<CarouselContainerProps> = ({ pickup, popularArticles }) => {
  if (pickup.articles.length > 0) {
    return (
      <div className="px-0 mt-8 md:px-16 md:mt-16">
        <PickupArticleCarousel pickup={pickup} />
      </div>
    );
  }

  if (popularArticles.length > 0) {
    return (
      <div className="px-0 mt-8 md:px-16 md:mt-16">
        <PopularArticleCarousel articles={popularArticles} />
      </div>
    );
  }

  return null;
};

type HomeLayoutProps = {
  children: React.ReactNode;
  pageTitle: string;
  config: TConfig;
  url: string;
  pickup: TPickup;
  categories: TCategory[];
  popularArticles: TRankedArticle[];
};

const HomeLayout: React.FC<HomeLayoutProps> = ({
  pickup,
  url,
  pageTitle,
  children,
  config,
  categories,
  popularArticles,
}: HomeLayoutProps) => {
  const isSmallOrDown = useMedia("<=", "sm");
  const ShareButtons = useMemo(() => dynamic(() => import("@/components/atoms/ShareButtons")), []);

  return (
    <RootLayout config={config} categories={categories}>
      <CarouselContainer pickup={pickup} popularArticles={popularArticles} />
      <MiddleAreaContainer>
        <AsideContainer side="left">
          <ShareButtons url={url} title={pageTitle} direction={isSmallOrDown ? "row" : "column"} />
        </AsideContainer>
        <MainContainer>{children}</MainContainer>
        <AsideContainer side="right">
          <CategoryListSide categories={categories} columns="grid-cols-3 sm:grid-cols-5 md:grid-cols-1" />
        </AsideContainer>
      </MiddleAreaContainer>
    </RootLayout>
  );
};

export default memo(HomeLayout);
