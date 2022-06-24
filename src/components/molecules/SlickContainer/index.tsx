import { memo } from "react";
import type { Settings } from "react-slick";
import Slick from "react-slick";

import { useMedia } from "@/hooks/useMedia";

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

type SlickContainerProps = {
  description: string;
  title: string;
  children: React.ReactNode;
  Icon: React.ReactNode;
};

export const SlickContainer: React.FC<SlickContainerProps> = memo(({ children, description, title, Icon }) => {
  const isMobile = useMedia("<=", "sm");

  return (
    <section>
      <div className="flex flex-row gap-2 items-center pl-1 mb-2 text-xl">
        {Icon}
        <h2 className="font-bold">{title}</h2>
        <span className="flex-1 text-sm text-center break-words">{description}</span>
      </div>
      {/* FIXME: reason is upgrade to React 18 */}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <Slick {...getSettings(isMobile)}>{children}</Slick>
    </section>
  );
});

SlickContainer.displayName = "SlickContainer";
