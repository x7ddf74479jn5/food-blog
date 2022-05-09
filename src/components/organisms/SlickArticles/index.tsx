import { memo } from "react";
import { FaLightbulb } from "react-icons/fa";
import type { Settings } from "react-slick";
import Slick from "react-slick";

import Thumbnail from "@/components/atoms/Thumbnail";
import { useMedia } from "@/hooks/useMedia";
import type { TPickup } from "@/types";

const getSettings = (isMobile: boolean): Settings => {
  return {
    pauseOnHover: true,
    arrows: false,
    dots: true,
    infinite: true,
    slidesToShow: 2,
    autoplay: isMobile ? false : true,
    speed: 500,
    cssEase: "ease-out",
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
};

type SlickArticlesProps = {
  pickup: TPickup;
};

export const SlickArticles: React.VFC<SlickArticlesProps> = memo(({ pickup }) => {
  const { articles, description } = pickup;
  const isMobile = useMedia("<=", "sm");

  return (
    <section>
      <div className="flex flex-row gap-1 items-center pl-1 mb-2 text-xl">
        <FaLightbulb className="text-yellow-400" />
        <h2 className="font-bold">PICKUP</h2>
        <span className="flex-1 text-sm text-center break-words">{description}</span>
      </div>
      <Slick {...getSettings(isMobile)}>
        {articles.map((article) => (
          <article className="relative px-1" key={article.id}>
            <Thumbnail src={article.image.url} title={article.title} id={article.id} />
            <div>
              <h3 className="inline-block absolute bottom-3 p-1 w-[calc(100%-0.5rem)] text-sm font-semibold text-white truncate bg-black bg-opacity-25 ">
                {article.title}
              </h3>
            </div>
          </article>
        ))}
      </Slick>
    </section>
  );
});

SlickArticles.displayName = "SlickArticles";
