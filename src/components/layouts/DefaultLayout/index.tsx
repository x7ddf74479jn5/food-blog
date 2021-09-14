import Meta from "@/components/molecules/Meta";
import Header from "@/components/organisms/Header";

type Props = {
  children: React.ReactNode;
  pageTitle?: string;
};

const DefaultLayout: React.FC<Props> = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <div className="px-4 mx-auto max-w-prose">
        <Header />
        <main className="pt-4 pb-12">{children}</main>
      </div>
    </>
  );
};

export default DefaultLayout;
