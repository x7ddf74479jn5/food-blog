import { withPerformance } from "storybook-addon-performance";
import "@styles/global.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/** Mock next/image to <img /> */
import "./mocks/NextImage";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [withPerformance];
