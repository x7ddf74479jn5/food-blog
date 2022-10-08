import type { Settings } from "react-slick";
import Slick from "react-slick";

const getSettings = (): Settings => {
  return {
    pauseOnHover: true,
    arrows: false,
    dots: true,
    infinite: true,
    slidesToShow: 2,
    autoplay: false,
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
  return <Slick {...getSettings()}>{children}</Slick>;
};
