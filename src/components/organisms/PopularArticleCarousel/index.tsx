import { memo } from "react";
import { IoPodium } from "react-icons/io5";

import Thumbnail from "@/components/atoms/Thumbnail";
import { SlickContainer } from "@/components/molecules/SlickContainer";
import type { TRankedArticle } from "@/types";

type PopularArticleCarouselProps = {
  articles: TRankedArticle[];
};

export const PopularArticleCarousel: React.FC<PopularArticleCarouselProps> = memo(({ articles }) => {
  return (
    <SlickContainer
      description="人気記事ランキング"
      title="POPULAR"
      href="/articles/popular"
      Icon={<IoPodium className="text-yellow-400" />}
    >
      {articles.map((article) => (
        <article className="px-2" key={article.id}>
          <div className="relative">
            <Thumbnail src={article.image.url} title={article.title} id={article.id} />
            <div className="absolute top-0 left-0 bg-black/25 p-2 text-sm font-semibold text-white">
              {article.order}
            </div>
            <h3 className="absolute bottom-3 block w-full truncate bg-black/25 p-1 text-sm font-semibold text-white">
              {article.title}
            </h3>
          </div>
        </article>
      ))}
    </SlickContainer>
  );
});

PopularArticleCarousel.displayName = "PopularArticleCarousel";
