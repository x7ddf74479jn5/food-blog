import dynamic from "next/dynamic";
import { memo, useMemo } from "react";

import { AsideContainer } from "@/components/atoms/containers/AsideContainer";
import { MainContainer } from "@/components/atoms/containers/MainContainer";
import { MiddleAreaContainer } from "@/components/atoms/containers/MiddleAreaContainer";
import { RootLayout } from "@/components/layouts/RootLayout";
import { CategoryListSide } from "@/components/molecules/CategoryListSide";
import { CarouselContainer } from "@/components/organisms/CarouselContainer";
import { useMedia } from "@/hooks/useMedia";
import type { TCategory, TConfig, TPickup, TRankedArticle } from "@/types";

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
