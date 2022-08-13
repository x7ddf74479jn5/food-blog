import { serialize } from "next-mdx-remote/serialize";
import remarkBreaks from "remark-breaks";
import remarkEmoji from "remark-emoji";
import remarkFootnotes from "remark-footnotes";
import remarkSlug from "remark-slug";
import remarkUnwrapImages from "remark-unwrap-images";

export const mdx2html = async (source: string) => {
  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkBreaks, remarkEmoji, remarkFootnotes, remarkSlug, remarkUnwrapImages],
    },
  });

  return mdxSource;
};
