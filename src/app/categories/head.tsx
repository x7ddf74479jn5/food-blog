import { HtmlHeadBase, HtmlHeadSeo } from "@/components/meta/HtmlHead";
import { getCategoriesPageMeta } from "@/components/pages/categories/Categories/meta";

const Head = async () => {
  const meta = await getCategoriesPageMeta();

  return (
    <head>
      <HtmlHeadBase />
      <HtmlHeadSeo {...meta} />
    </head>
  );
};

export default Head;
