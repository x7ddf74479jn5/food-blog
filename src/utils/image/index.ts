export const getBlurDataURL = () =>
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII=";

import { getPlaiceholder } from "plaiceholder";

export const generateImageBlurDataURL = async (src: string) => {
  const { base64 } = await getPlaiceholder(`${src}?q=0`);

  return base64;
};
