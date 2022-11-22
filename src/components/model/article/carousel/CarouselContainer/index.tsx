"use client";

import { Tab } from "@headlessui/react";

import { classNames } from "@/utils/css";

type CarouselContainerProps = {
  items: {
    Carousel: React.ReactNode;
    Icon: React.ReactNode;
    description: string;
    id: string;
    label: string;
  }[];
};

export const CarouselContainer: React.FC<CarouselContainerProps> = ({ items }) => {
  if (items.length === 0) return null;

  return (
    <section className="mt-8 px-0 md:mt-16 md:px-16">
      <Tab.Group>
        <Tab.List className="flex space-x-2 rounded-md bg-gray-50 p-1 dark:bg-gray-700">
          {items.map(({ Icon, id, label }) => (
            <Tab
              key={id}
              className={({ selected }) =>
                classNames(
                  "w-full flex items-center justify-center rounded-md py-1 text-sm font-medium leading-5 text-black dark:text-white",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2",
                  selected ? "bg-white dark:bg-gray-600 shadow" : "dark:text-white hover:bg-white/[0.12]"
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
          {items.map(({ Carousel, description, id }) => (
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
