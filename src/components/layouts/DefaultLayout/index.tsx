import { memo } from "react";

import {
  AsideContainer,
  BottomAreaContainer,
  ContainerWithOrder,
  MainContainer,
  MiddleAreaContainer,
} from "@/components/atoms/containers";
import { RootLayout } from "@/components/layouts";
import { BackLinks } from "@/components/molecules/BackLinks";
import { CategoryListSide } from "@/components/molecules/category/CategoryListSide";
import { ShareButtons } from "@/components/molecules/ShareButtons";
import { PickupArticles, PopularArticles } from "@/components/organisms/article";
import type { TCategory, TConfig, TPickup, TRankedArticle } from "@/types";

type Props = {
  children: React.ReactNode;
  pageTitle: string;
  config: TConfig;
  url: string;
  backLinks: Array<{
    href: string;
    label: string;
  }>;
  categories: TCategory[];
  pickup: TPickup;
  popularArticles: TRankedArticle[];
};

const DefaultLayout: React.FC<Props> = ({
  url,
  pageTitle,
  children,
  config,
  backLinks,
  categories,
  pickup,
  popularArticles,
}) => {
  return (
    <RootLayout config={config} categories={categories}>
      <MiddleAreaContainer>
        <AsideContainer side="left">
          <ShareButtons url={url} title={pageTitle} />
        </AsideContainer>
        <MainContainer>{children}</MainContainer>
        <AsideContainer side="right">
          <CategoryListSide categories={categories} columns="grid-cols-3 sm:grid-cols-5 md:grid-cols-1" />
        </AsideContainer>
      </MiddleAreaContainer>
      <BottomAreaContainer>
        <ContainerWithOrder order="order-1 lg:order-2" className="grow">
          <PickupArticles pickupArticles={pickup.articles} />
          <PopularArticles popularArticles={popularArticles} />
        </ContainerWithOrder>
        <ContainerWithOrder order="order-2 lg:order-1" className="shrink">
          <BackLinks links={backLinks} />
        </ContainerWithOrder>
      </BottomAreaContainer>
    </RootLayout>
  );
};

export default memo(DefaultLayout);
