import type { GetStaticProps, NextPage } from "next";

import { fetchCategories, fetchConfig } from "@/api";
import type { Error404Props } from "@/components/pages/error/404";
import { Error404 } from "@/components/pages/error/404";

const Error404Page: NextPage<Error404Props> = (props) => <Error404 {...props} />;

export default Error404Page;

type StaticProps = Error404Props;

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
