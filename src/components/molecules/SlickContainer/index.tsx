import { memo } from "react";
import type { Settings } from "react-slick";
import Slick from "react-slick";

import NextLink from "@/components/atoms/NextLink";
import { useMedia } from "@/hooks/useMedia";
import type { UrlTableValue } from "@/utils/paths/url";

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
  href: UrlTableValue;
};

export const SlickContainer: React.FC<SlickContainerProps> = memo(({ children, description, title, Icon, href }) => {
  const isMobile = useMedia("<=", "sm");

  return (
    <>
      <div className="mb-2 flex flex-row items-center gap-2 pl-1">
        <NextLink href={href}>
          <div className="flex flex-row items-center gap-2 text-xl">
            {Icon}
            <h2 className="font-bold">{title}</h2>
          </div>
        </NextLink>
        <span className="flex-1 break-words text-center text-sm">{description}</span>
      </div>
      {/* FIXME: reason is upgrade to React 18 */}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <Slick {...getSettings(isMobile)}>{children}</Slick>
    </>
  );
});

SlickContainer.displayName = "SlickContainer";
