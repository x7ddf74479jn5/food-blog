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
import type { TCategory, TConfig, TPickup, TRankedArticle, TTag } from "@/types";

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
  tags: TTag[];
  pickup: TPickup;
  popularArticles: TRankedArticle[];
};

const DefaultLayout: React.FC<Props> = ({
  backLinks,
  categories,
  children,
  config,
  pageTitle,
  pickup,
  popularArticles,
  tags,
  url,
}) => {
  return (
    <RootLayout config={config} categories={categories} tags={tags}>
      <MiddleAreaContainer>
        <AsideContainer className="order-2 md:order-1">
          <ShareButtons url={url} title={pageTitle} className="flex-row md:flex-col" />
        </AsideContainer>
        <MainContainer className="order-1 md:order-2">{children}</MainContainer>
        <AsideContainer className="order-3">
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
