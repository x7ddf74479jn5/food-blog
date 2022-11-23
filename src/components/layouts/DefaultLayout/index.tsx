import { BackLinks } from "@/components/feature/BackLinks";
import { ShareButtons } from "@/components/feature/ShareButtons";
import { PickupArticles, PopularArticles } from "@/components/model/article";
import { CategoryListSide } from "@/components/model/category/CategoryListSide";
import {
  AsideContainer,
  BottomAreaContainer,
  ContainerWithOrder,
  MainContainer,
  MiddleAreaContainer,
} from "@/components/ui/containers";

type Props = {
  children: React.ReactNode;
  pageTitle: string;
  url: string;
  backLinks: Array<{
    href: string;
    label: string;
  }>;
};

const DefaultLayout: React.FC<Props> = ({ backLinks, children, pageTitle, url }) => {
  return (
    <>
      <MiddleAreaContainer>
        <AsideContainer className="order-2 md:order-1">
          <ShareButtons url={url} title={pageTitle} className="flex-row md:flex-col" />
        </AsideContainer>
        <MainContainer className="order-1 md:order-2">{children}</MainContainer>
        <AsideContainer className="order-3">
          {/* @ts-expect-error  server component */}
          <CategoryListSide columns="grid-cols-3 sm:grid-cols-5 md:grid-cols-1" />
        </AsideContainer>
      </MiddleAreaContainer>
      <BottomAreaContainer>
        <ContainerWithOrder order="order-1 lg:order-2" className="grow">
          {/* @ts-expect-error  server component */}
          <PickupArticles />
          {/* @ts-expect-error  server component */}
          <PopularArticles />
        </ContainerWithOrder>
        <ContainerWithOrder order="order-2 lg:order-1" className="shrink">
          <BackLinks links={backLinks} />
        </ContainerWithOrder>
      </BottomAreaContainer>
    </>
  );
};

export default DefaultLayout;
