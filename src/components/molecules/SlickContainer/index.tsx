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
  children: React.ReactNode;
};

export const SlickContainer: React.FC<SlickContainerProps> = ({ children }) => {
  const isMobile = useMedia("<=", "sm");

  return <Slick {...getSettings(isMobile)}>{children}</Slick>;
};
