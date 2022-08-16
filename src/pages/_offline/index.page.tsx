import type { GetStaticProps, NextPage } from "next";

import { fetchCategories, fetchConfig } from "@/api";
import type { OfflineProps } from "@/components/pages/Offline";
import { Offline } from "@/components/pages/Offline";

const OfflinePage: NextPage<OfflineProps> = (props) => <Offline {...props} />;

type StaticProps = OfflineProps;

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const config = await fetchConfig();
  const categories = await fetchCategories();

  return {
    props: {
      config,
      categories,
    },
  };
};
export default OfflinePage;
