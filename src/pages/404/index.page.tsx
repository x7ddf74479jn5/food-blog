import type { GetStaticProps, NextPage } from "next";

import type { Error404Props } from "@/components/pages/error/404";
import { Error404 } from "@/components/pages/error/404";
import { fetchConfig, fetchTags } from "@/repositories";
import { getCategories } from "@/services/category";

const Error404Page: NextPage<Error404Props> = (props) => <Error404 {...props} />;

export default Error404Page;

type StaticProps = Error404Props;

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const [config, categories, tags] = await Promise.all([fetchConfig(), getCategories(), fetchTags()]);

  return {
    props: {
      categories,
      config,
      tags,
    },
  };
};
