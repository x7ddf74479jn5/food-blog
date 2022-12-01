import BackLinks from "@/components/feature/BackLinks";
import { ShareButtons } from "@/components/feature/ShareButtons";
import { PickupArticles } from "@/components/model/article/PickupArticles";
import { PopularArticles } from "@/components/model/article/PopularArticles";
import { CategoryList } from "@/components/model/category/CategoryList";
import {
  AsideContainer,
  BottomAreaContainer,
  ContainerWithOrder,
  MiddleAreaContainer,
} from "@/components/ui/containers";
import { getBackLinks, urlTable } from "@/utils/paths/url";

import { getCategoriesPageMeta } from "./meta";

export const Categories = async () => {
  const { title, url } = await getCategoriesPageMeta();
  const backLinks = getBackLinks([urlTable.home]);

  return (
    <>
      <h1 className="my-8">カテゴリー一覧</h1>
      <MiddleAreaContainer>
        <AsideContainer className="order-2 md:order-1 lg:w-full">
          <ShareButtons url={url} title={title} className="flex-row md:flex-col" />
        </AsideContainer>
        <main className="order-1 md:order-2">
          {/* @ts-expect-error server component */}
          <CategoryList width={128} height={128} />
        </main>
      </MiddleAreaContainer>
      <BottomAreaContainer>
        <ContainerWithOrder order="order-1 lg:order-2" className="grow">
          {/* @ts-expect-error server component */}
          <PickupArticles />
          {/* @ts-expect-error server component */}
          <PopularArticles />
        </ContainerWithOrder>
        <ContainerWithOrder order="order-2 lg:order-1" className="shrink">
          <BackLinks links={backLinks} />
        </ContainerWithOrder>
      </BottomAreaContainer>
    </>
  );
};
