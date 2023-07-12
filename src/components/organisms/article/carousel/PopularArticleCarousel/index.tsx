import { memo } from "react";

import Thumbnail from "@/components/atoms/Thumbnail";
import { CarouselCore } from "@/components/organisms/article/carousel/CarouselCore";
import type { TRankedArticle } from "@/types";

type PopularArticleCarouselProps = {
  articles: TRankedArticle[];
};

export const PopularArticleCarousel: React.FC<PopularArticleCarouselProps> = memo(({ articles }) => {
  return (
    <CarouselCore>
      {articles.map((article) => (
        <article className="relative max-h-48 w-full min-w-full overflow-hidden pl-2 sm:min-w-[50%]" key={article.id}>
          <Thumbnail
            src={article.image.url}
            title={article.title}
            id={article.id}
            blurDataURL={article.image.url}
            alt={article.title}
          />
          <div className="absolute top-0 left-2 bg-black/25 p-2 text-sm font-semibold text-white">{article.order}</div>
          <h3 className="absolute bottom-3 block w-full truncate bg-black/25 p-1 text-sm font-semibold text-white">
            {article.title}
          </h3>
        </article>
      ))}
    </CarouselCore>
  );
});

PopularArticleCarousel.displayName = "PopularArticleCarousel";
