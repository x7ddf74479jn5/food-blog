import { RootLayout } from "@/components/layouts/RootLayout";
import type { TConfig } from "@/types";

type Props = {
  children: React.ReactNode;
  pageTitle?: string;
  config: TConfig;
};

const DefaultLayout: React.FC<Props> = ({ children, config }: Props) => {
  return (
    <RootLayout config={config}>
      <main className="overflow-hidden pt-4 pb-12 max-w-prose">{children}</main>
    </RootLayout>
  );
};

export default DefaultLayout;
