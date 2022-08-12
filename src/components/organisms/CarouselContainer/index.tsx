import { Tab } from "@headlessui/react";
import { useMemo } from "react";
import { FaLightbulb } from "react-icons/fa";
import { IoPodium } from "react-icons/io5";

import { PickupArticleCarousel } from "@/components/organisms/PickupArticleCarousel";
import { PopularArticleCarousel } from "@/components/organisms/PopularArticleCarousel";
import type { TPickup, TRankedArticle } from "@/types";
import { classNames } from "@/utils/css";

type CarouselContainerProps = { pickup: TPickup | undefined; popularArticles: TRankedArticle[] };

export const CarouselContainer: React.FC<CarouselContainerProps> = ({ pickup, popularArticles }) => {
  const tabItems = useMemo(() => {
    const items = [];
    if (pickup && pickup.articles.length > 0) {
      items.push({
        id: "pickup",
        label: "PICKUP",
        Icon: <FaLightbulb className="h-4 w-4 text-yellow-400" />,
        description: pickup?.description,
        Carousel: <PickupArticleCarousel pickup={pickup} />,
      });
    }

    if (popularArticles.length > 0) {
      items.push({
        id: "popular",
        label: "POPULAR",
        Icon: <IoPodium className="h-4 w-4 text-yellow-400" />,
        description: "人気記事ランキング",
        Carousel: <PopularArticleCarousel articles={popularArticles} />,
      });
    }

    return items;
  }, [pickup, popularArticles]);

  if (tabItems.length === 0) return null;

  return (
    <section className="mt-8 px-0 md:mt-16 md:px-16">
      <Tab.Group>
        <Tab.List className="flex space-x-2 rounded-md bg-gray-50 p-1 dark:bg-gray-700">
          {tabItems.map(({ id, label, Icon }) => (
            <Tab
              key={id}
              className={({ selected }) =>
                classNames(
                  "w-full flex items-center justify-center rounded-md py-1 text-sm font-medium leading-5 text-black dark:text-white",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2",
                  selected ? "bg-white dark:bg-gray-600 shadow" : "text-white hover:bg-white/[0.12]"
                )
              }
            >
              <div className="flex flex-row items-center gap-2 text-base">
                {Icon}
                <h2>{label}</h2>
              </div>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabItems.map(({ id, description, Carousel }) => (
            <Tab.Panel key={id} className="mt-2 space-y-2">
              <>
                <p className="break-words text-center text-sm sm:text-lg">{description}</p>
                {Carousel}
              </>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </section>
  );
};
