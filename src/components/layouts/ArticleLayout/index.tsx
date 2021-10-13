import dynamic from "next/dynamic";

import { ContainerWithOrder } from "@/components/atoms/containers/ContainerWithOrder";
import { ShareButtons } from "@/components/atoms/ShareButtons/index";
import { RootLayout } from "@/components/layouts/RootLayout";
import { TOC } from "@/components/molecules/TOC/index";
import { CategoryMenu } from "@/components/organisms/CategoryMenu";
import { RelatedArticles } from "@/components/organisms/RelatedArticles";
import type { TArticle, TCategory, TConfig } from "@/types";

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
};

const ArticleLayout: React.FC<Props> = ({
  url,
  children,
  config,
  pageTitle,
  backLinks,
  relatedArticles,
  categories,
}: Props) => {
  const BackLinks = dynamic(() => import("@/components/molecules/BackLinks"));
  return (
    <RootLayout config={config}>
      <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start mt-4 mb-8">
        <main className="pb-12">{children}</main>
        <aside className="flex lg:sticky top-8 flex-col gap-y-8 items-center mb-4 w-full lg:w-1/3 h-full">
          <ContainerWithOrder order="order-1 lg:order-4">
            <TOC isSide />
          </ContainerWithOrder>
          <ContainerWithOrder order="order-2 lg:order-3">
            <ShareButtons url={url} title={pageTitle} twitterId={config.twitterId} />
          </ContainerWithOrder>
          <ContainerWithOrder order="order-3 lg:order-2">
            <RelatedArticles relatedArticles={relatedArticles} />
          </ContainerWithOrder>
          <ContainerWithOrder order="order-4 lg:order-1">
            <CategoryMenu categories={categories} columns="grid-cols-3 md:grid-cols-5 lg:grid-cols-3" />
          </ContainerWithOrder>
        </aside>
      </div>
      <div className="mt-8 mb-16">
        <BackLinks links={backLinks} />
      </div>
    </RootLayout>
  );
};

export default ArticleLayout;
