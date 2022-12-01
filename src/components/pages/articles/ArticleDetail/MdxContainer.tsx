"use client";

import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { MDXRemote } from "next-mdx-remote";

import MDXCustomComponents from "@/components/ui/mdx";

type Props = {
  customData: any;
  src: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, string>>;
};

export const MdxContainer: React.FC<Props> = ({ customData, src }) => {
  return (
    <div id="js-toc-content">
      <MDXRemote {...src} components={MDXCustomComponents} scope={customData} />
    </div>
  );
};
