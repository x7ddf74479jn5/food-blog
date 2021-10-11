import { FaLightbulb } from "react-icons/fa";
import type { Settings } from "react-slick";
import Slick from "react-slick";

import Thumbnail from "@/components/atoms/Thumbnail";
import type { TArticle } from "@/types";

const settings: Settings = {
  infinite: true,
  slidesToShow: 2,
  autoplay: true,
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

type SlickArticlesProps = {
  articles: TArticle[];
};

export const SlickArticles: React.VFC<SlickArticlesProps> = ({ articles }) => {
  return (
    <section className="mb-16">
      <div className="flex flex-row gap-1 items-center pl-1 mb-2 text-xl">
        <FaLightbulb className="text-yellow-400" />
        <h2 className="font-bold">PICKUP</h2>
      </div>
      <Slick {...settings}>
        {articles.map((article) => (
          <article className="relative px-1" key={article.id}>
            <Thumbnail src={article.image.url} title={article.title} id={article.id} />
            <div className="">
              <h3 className="inline-block absolute bottom-3 p-1 w-[calc(100%-0.5rem)] text-sm font-semibold text-white truncate bg-black bg-opacity-25 ">
                {article.title}
              </h3>
            </div>
          </article>
        ))}
      </Slick>
    </section>
  );
};
