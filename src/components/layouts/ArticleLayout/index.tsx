import BackLinks from "@/components/molecules/BackLinks";
import Meta from "@/components/molecules/Meta";
import { TOC } from "@/components/molecules/TOC/index";
import Header from "@/components/organisms/Header";
import type { TConfig } from "@/types";

type Props = {
  children: React.ReactNode;
  pageTitle?: string;
  config: TConfig;
  backLinks: Array<{
    href: string;
    label: string;
  }>;
};

const ArticleLayout: React.FC<Props> = ({ children, config, backLinks }: Props) => {
  return (
    <>
      <Meta />
      <div className="px-4 mx-auto max-w-screen-lg">
        <Header siteTitle={config.siteTitle} />
        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start mt-4">
          <main className="pb-12">{children}</main>
          <TOC isSide />
        </div>
        <BackLinks links={backLinks} />
      </div>
    </>
  );
};

export default ArticleLayout;
