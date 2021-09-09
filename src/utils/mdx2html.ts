import { serialize } from "next-mdx-remote/serialize";

export const mdx2html = async (source: string) => {
  const mdxSource = await serialize(source);

  return mdxSource;
};

export default mdx2html;
