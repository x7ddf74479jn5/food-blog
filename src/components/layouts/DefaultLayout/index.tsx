import dynamic from "next/dynamic";
import { memo } from "react";

import { AsideContainer } from "@/components/atoms/containers/AsideContainer";
import { BottomAreaContainer } from "@/components/atoms/containers/BottomAreaContainer";
import { ContainerWithOrder } from "@/components/atoms/containers/ContainerWithOrder";
import { MainContainer } from "@/components/atoms/containers/MainContainer";
import { MiddleAreaContainer } from "@/components/atoms/containers/MiddleAreaContainer";
import { RootLayout } from "@/components/layouts/RootLayout";
import { CategoryListSide } from "@/components/molecules/CategoryListSide";
import { PickupArticles } from "@/components/organisms/PickupArticles/index";
import { useMedia } from "@/hooks/useMedia";
import type { TCategory, TConfig, TPickup } from "@/types";

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
};

const DefaultLayout: React.FC<Props> = ({ url, pageTitle, children, config, backLinks, categories, pickup }: Props) => {
  const BackLinks = dynamic(() => import("@/components/molecules/BackLinks"));
  const ShareButtons = dynamic(() => import("@/components/atoms/ShareButtons"));
  const isSmallOrDown = useMedia("<=", "sm");

  return (
    <RootLayout config={config} categories={categories}>
      <MiddleAreaContainer>
        <AsideContainer side="left">
          <ShareButtons url={url} title={pageTitle} direction={isSmallOrDown ? "row" : "column"} />
        </AsideContainer>
        <MainContainer>{children}</MainContainer>
        <AsideContainer side="right">
          <CategoryListSide categories={categories} columns="grid-cols-3 sm:grid-cols-5 md:grid-cols-1" />
        </AsideContainer>
      </MiddleAreaContainer>
      <BottomAreaContainer>
        <ContainerWithOrder order="order-1 lg:order-2" className="flex-grow">
          <PickupArticles pickupArticles={pickup.articles} />
        </ContainerWithOrder>
        <ContainerWithOrder order="order-2 lg:order-1" className="flex-shrink">
          <BackLinks links={backLinks} />
        </ContainerWithOrder>
      </BottomAreaContainer>
    </RootLayout>
  );
};

export default memo(DefaultLayout);
