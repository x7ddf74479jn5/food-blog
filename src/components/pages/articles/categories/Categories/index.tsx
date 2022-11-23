import BackLinks from "@/components/feature/BackLinks";
import { ShareButtons } from "@/components/feature/ShareButtons";
import { PickupArticles, PopularArticles } from "@/components/model/article";
import { CategoryList } from "@/components/model/category/CategoryList";
import {
  AsideContainer,
  BottomAreaContainer,
  ContainerWithOrder,
  MiddleAreaContainer,
} from "@/components/ui/containers";
import { fetchConfig } from "@/repositories";
import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { getBackLinks, urlTable } from "@/utils/paths/url";

export const Categories = async () => {
  const { host, siteTitle } = await fetchConfig();
  const pageTitle = formatPageTitle("カテゴリー一覧", siteTitle);
  const url = formatPageUrl(urlTable.categories, host);
  const backLinks = getBackLinks([urlTable.home]);

  return (
    <>
      <h1 className="my-8">カテゴリー一覧</h1>
      <MiddleAreaContainer>
        <AsideContainer className="order-2 md:order-1 lg:w-full">
          <ShareButtons url={url} title={pageTitle} className="flex-row md:flex-col" />
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
