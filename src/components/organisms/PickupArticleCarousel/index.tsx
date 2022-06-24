import { memo } from "react";
import { FaLightbulb } from "react-icons/fa";

import Thumbnail from "@/components/atoms/Thumbnail";
import { SlickContainer } from "@/components/molecules/SlickContainer";
import type { TPickup } from "@/types";

type PickupArticleCarouselProps = {
  pickup: TPickup;
};

export const PickupArticleCarousel: React.FC<PickupArticleCarouselProps> = memo(({ pickup }) => {
  const { articles, description } = pickup;

  return (
    <section>
      <SlickContainer description={description} title="PICKUP" Icon={<FaLightbulb className="text-yellow-400" />}>
        {articles.map((article) => (
          <article className="px-2" key={article.id}>
            <div className="relative">
              <Thumbnail src={article.image.url} title={article.title} id={article.id} />
              <div className="absolute top-0 left-0 p-2 text-sm font-semibold text-white bg-black/25">T</div>
              <h3 className="block absolute bottom-3 p-1 w-full text-sm font-semibold text-white truncate bg-black/25">
                {article.title}
              </h3>
            </div>
          </article>
        ))}
      </SlickContainer>
    </section>
  );
});

PickupArticleCarousel.displayName = "PickupArticleCarousel";
