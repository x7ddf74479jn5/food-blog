import Meta from "@/components/molecules/Meta";
import Header from "@/components/organisms/Header";
import type { TConfig } from "@/types";

type Props = {
  children: React.ReactNode;
  pageTitle?: string;
  config: TConfig;
};

const ArticleLayout: React.FC<Props> = ({ children, config }: Props) => {
  return (
    <>
      <Meta />
      <div className="px-4 mx-auto max-w-prose">
        <Header siteTitle={config.siteTitle} />
        <main className="pt-4 pb-12">{children}</main>
      </div>
    </>
  );
};

export default ArticleLayout;
