import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

import { DotButton, NextButton, PrevButton } from "./CarouselButton";

type Props = {
  children: React.ReactNode;
};

export const CarouselCore: React.FC<Props> = ({ children }) => {
  const [viewportRef, embla] = useEmblaCarousel({
    breakpoints: {
      "(min-width: 640px)": { slidesToScroll: 2 },
    },
    dragFree: true,
    loop: true,
    skipSnaps: false,
    slidesToScroll: 1,
  });
  const [isPrevBtnEnabled, setIsPrevBtnEnabled] = useState(false);
  const [isNextBtnEnabled, setIsNextBtnEnabled] = useState(false);
  const [isSelectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const handleScrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const handleScrollNext = useCallback(() => embla?.scrollNext(), [embla]);
  const handleScrollTo = useCallback((index: number) => embla?.scrollTo(index), [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
    setIsPrevBtnEnabled(embla.canScrollPrev());
    setIsNextBtnEnabled(embla.canScrollNext());
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    embla.reInit();
    onSelect();
    setScrollSnaps(embla?.scrollSnapList());
    embla.on("select", onSelect);
  }, [embla, setScrollSnaps, onSelect]);

  return (
    <>
      <div className="relative w-full">
        <div className="w-full select-none overflow-hidden" ref={viewportRef}>
          <div className="-ml-2 flex">{children}</div>
        </div>
        <PrevButton onClick={handleScrollPrev} enabled={isPrevBtnEnabled} />
        <NextButton onClick={handleScrollNext} enabled={isNextBtnEnabled} />
      </div>
      <div className="flex h-4 list-none justify-center pt-2">
        {scrollSnaps.map((_, index) => (
          <DotButton key={index} selected={index === isSelectedIndex} onClick={() => handleScrollTo(index)} />
        ))}
      </div>
    </>
  );
};
