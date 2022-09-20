import { getPlaiceholder } from "plaiceholder";

export const generateImageBlurDataURL = async (src: string) => {
  const { base64 } = await getPlaiceholder(`${src}?q=0`);

  return base64;
};
