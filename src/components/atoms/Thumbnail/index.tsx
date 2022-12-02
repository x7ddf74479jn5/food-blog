import Image from "next/image";
import { memo } from "react";

import NextLink from "@/components/atoms/NextLink";
import { urlTable } from "@/utils/paths/url";

type Props = {
  title: string;
  src: string;
  loading?: "eager" | "lazy";
  blurDataURL?: string;
  id?: string;
};

const Thumbnail: React.FC<Props> = ({ blurDataURL, id, loading = "lazy", src, title }) => {
  const image = (
    <Image
      src={src}
      alt={title}
      width={640}
      height={360}
      loading={loading}
      className="aspect-video h-auto w-full object-cover"
      placeholder={blurDataURL ? "blur" : "empty"}
      blurDataURL={blurDataURL}
    />
  );
  return (
    <>
      {id ? (
        <NextLink href={`${urlTable.articles}/${id}`} aria-label={title}>
          {image}
        </NextLink>
      ) : (
        image
      )}
    </>
  );
};

export default memo(Thumbnail);
