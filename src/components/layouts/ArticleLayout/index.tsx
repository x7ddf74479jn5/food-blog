import dynamic from "next/dynamic";
import { memo, useMemo } from "react";

import { BottomAreaContainer } from "@/components/atoms/containers/BottomAreaContainer";
import { ContainerWithOrder } from "@/components/atoms/containers/ContainerWithOrder";
import { ShareButtons } from "@/components/atoms/ShareButtons/index";
import { RootLayout } from "@/components/layouts/RootLayout";
import { CategoryListSide } from "@/components/molecules/CategoryListSide";
import { TOC } from "@/components/molecules/TOC/index";
import { PickupArticles } from "@/components/organisms/PickupArticles/index";
import { PopularArticles } from "@/components/organisms/PopularArticles";
import { RelatedArticles } from "@/components/organisms/RelatedArticles";
import type { TArticle, TCategory, TConfig, TPickup, TRankedArticle } from "@/types";

type Props = {
  url: string;
  children: React.ReactNode;
  pageTitle: string;
  config: TConfig;
  backLinks: Array<{
    href: string;
    label: string;
  }>;
  relatedArticles: TArticle[];
  categories: TCategory[];
  pickup: TPickup;
  popularArticles: TRankedArticle[];
};

const ArticleLayout: React.FC<Props> = ({
  url,
  children,
  config,
  pageTitle,
  backLinks,
  relatedArticles,
  categories,
  pickup,
  popularArticles,
}: Props) => {
  const BackLinks = useMemo(() => dynamic(() => import("@/components/molecules/BackLinks")), []);
  return (
    <RootLayout config={config} categories={categories}>
      <div className="flex flex-col gap-16 items-center mt-4 mb-8 lg:flex-row lg:justify-between lg:items-start lg:mb-16 ">
        <main className="pb-12">{children}</main>
        <aside className="flex top-8 flex-col gap-y-8 items-center w-full h-full lg:sticky lg:w-1/3">
          <ContainerWithOrder order="order-1 lg:order-4">
            <TOC isSide />
          </ContainerWithOrder>
          <ContainerWithOrder order="order-2 lg:order-3">
            <ShareButtons url={url} title={pageTitle} />
          </ContainerWithOrder>
          <ContainerWithOrder order="order-3 lg:order-2">
            <RelatedArticles relatedArticles={relatedArticles} />
          </ContainerWithOrder>
          <ContainerWithOrder order="order-4 lg:order-1">
            <CategoryListSide categories={categories} columns="grid-cols-3 md:grid-cols-5 lg:grid-cols-3" />
          </ContainerWithOrder>
        </aside>
      </div>
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

export default memo(ArticleLayout);
