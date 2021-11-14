import React from "react";

import { ArticleTipWithThumb } from "@/components/molecules/ArticleTipList/index";
import type { TArticle } from "@/types";

type LinkCardProps = {
  article: TArticle;
};

export const LinkCard: React.VFC<LinkCardProps> = ({ article }) => {
  return (
    <div className="p-4 my-8 dark:text-white border border-gray-300 dark:border-gray-700">
      <ArticleTipWithThumb article={article} />
    </div>
  );
};
