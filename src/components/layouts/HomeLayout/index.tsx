import { memo, useMemo } from "react";

import { AsideContainer, MainContainer, MiddleAreaContainer } from "@/components/atoms/containers";
import { RootLayout } from "@/components/layouts";
import { CategoryListSide } from "@/components/molecules/category/CategoryListSide";
import { ShareButtons } from "@/components/molecules/ShareButtons";
import { CarouselContainer } from "@/components/organisms/article";
import { useMedia } from "@/hooks/useMedia";
import type { TCategory, TConfig, TPickup, TRankedArticle } from "@/types";

const useShouldRenderCarousel = ({
  pickup,
  popularArticles,
}: {
  pickup: TPickup;
  popularArticles: TRankedArticle[];
}) => {
  return useMemo(() => {
    const hasPickup = pickup && pickup.articles.length > 0;
    const hasPopularArticles = popularArticles.length > 0;

    return hasPickup || hasPopularArticles ? true : false;
  }, [pickup, popularArticles]);
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
}) => {
  const isSmallOrDown = useMedia("<=", "sm");
  const shouldRenderCarousel = useShouldRenderCarousel({ pickup, popularArticles });

  return (
    <RootLayout config={config} categories={categories}>
      {shouldRenderCarousel && <CarouselContainer pickup={pickup} popularArticles={popularArticles} />}
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
