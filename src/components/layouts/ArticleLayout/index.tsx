import BackLinks from "@/components/feature/BackLinks";
import { ShareButtons } from "@/components/feature/ShareButtons";
import { PickupArticles, PopularArticles, RelatedArticles } from "@/components/model/article";
import { TOC } from "@/components/model/article/TOC";
import { CategoryListSide } from "@/components/model/category/CategoryListSide";
import { BottomAreaContainer } from "@/components/ui/containers/BottomAreaContainer";
import { ContainerWithOrder } from "@/components/ui/containers/ContainerWithOrder";

type Props = {
  articleId: string;
  url: string;
  children: React.ReactNode;
  pageTitle: string;
  backLinks: Array<{
    href: string;
    label: string;
  }>;
};

const ArticleLayout: React.FC<Props> = ({ backLinks, children, pageTitle, url }) => {
  return (
    <>
      <div className="mt-4 mb-8 flex flex-col items-center gap-16 lg:mb-16 lg:flex-row lg:items-start lg:justify-between ">
        <main className="pb-12">{children}</main>
        <aside className="top-8 flex h-full w-full flex-col items-center gap-y-8 lg:sticky lg:w-1/3">
          <ContainerWithOrder order="order-1 lg:order-4">
            <TOC isSide />
          </ContainerWithOrder>
          <ContainerWithOrder order="order-2 lg:order-3">
            <ShareButtons url={url} title={pageTitle} className="flex-row" />
          </ContainerWithOrder>
          <ContainerWithOrder order="order-3 lg:order-2">
            {/* @ts-expect-error server component */}
            <RelatedArticles thisArticleId={articleId} />
          </ContainerWithOrder>
          <ContainerWithOrder order="order-4 lg:order-1">
            {/* @ts-expect-error server component */}
            <CategoryListSide columns="grid-cols-3 md:grid-cols-5 lg:grid-cols-3" />
          </ContainerWithOrder>
        </aside>
      </div>
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

export default ArticleLayout;
