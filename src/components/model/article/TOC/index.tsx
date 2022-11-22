"use client";

import { memo, useEffect, useRef, useState } from "react";
import * as tocbot from "tocbot";

import { SideSectionContainer } from "@/components/ui/containers";
import { useMedia } from "@/hooks/useMedia";

type Props = {
  isSide?: boolean;
};

const TARGET_NODES = "h1, h2, h3, h4, h5, h6";

// @see https://tscanlin.github.io/tocbot/
export const TOC = ({ isSide = false }: Props) => {
  const unmountRef = useRef(false);
  const isLargeOrUp = useMedia(">=", "lg");
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const isExists = !!document.querySelectorAll("h2, h3, h4, h5, h6")?.length;
    if (!unmountRef.current) {
      setIsHidden(!isExists);
    }
    return () => {
      unmountRef.current = true;
    };
  }, [isLargeOrUp, isSide]);

  useEffect(() => {
    if (isHidden) {
      return;
    }

    tocbot.init({
      contentSelector: "#js-toc-content",
      hasInnerContainers: true,
      headingSelector: TARGET_NODES,
      headingsOffset: 100,
      orderedList: false,
      scrollSmoothOffset: -48,
      tocSelector: "#js-toc",
    });

    return () => {
      tocbot.destroy();
    };
  });
  // eslint-disable-next-line tailwindcss/no-custom-classname
  return isHidden ? null : (
    <SideSectionContainer header="目次">
      <div id="js-toc" className="toc" />
    </SideSectionContainer>
  );
};

export default memo(TOC);
