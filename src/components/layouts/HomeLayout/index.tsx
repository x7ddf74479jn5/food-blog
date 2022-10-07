import { memo, useMemo } from "react";

import { AsideContainer, MainContainer, MiddleAreaContainer } from "@/components/atoms/containers";
import { RootLayout } from "@/components/layouts";
import { CategoryListSide } from "@/components/molecules/category/CategoryListSide";
import { ShareButtons } from "@/components/molecules/ShareButtons";
import { CarouselContainer } from "@/components/organisms/article";
import type { TCategory, TConfig, TPickup, TRankedArticle, TTag } from "@/types";

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
  tags: TTag[];

  popularArticles: TRankedArticle[];
};

const HomeLayout: React.FC<HomeLayoutProps> = ({
  pickup,
  url,
  pageTitle,
  children,
  config,
  categories,
  tags,
  popularArticles,
}) => {
  const shouldRenderCarousel = useShouldRenderCarousel({ pickup, popularArticles });

  return (
    <RootLayout config={config} categories={categories} tags={tags}>
      {shouldRenderCarousel && <CarouselContainer pickup={pickup} popularArticles={popularArticles} />}
      <MiddleAreaContainer>
        <AsideContainer className="order-2 md:order-1">
          <ShareButtons url={url} title={pageTitle} className="flex-row md:flex-col" />
        </AsideContainer>
        <MainContainer className="order-1 md:order-2">{children}</MainContainer>
        <AsideContainer className="order-3">
          <CategoryListSide categories={categories} columns="grid-cols-3 sm:grid-cols-5 md:grid-cols-1" />
        </AsideContainer>
      </MiddleAreaContainer>
    </RootLayout>
  );
};

export default memo(HomeLayout);
