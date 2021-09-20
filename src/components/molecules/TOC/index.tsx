import { memo, useEffect, useRef, useState } from "react";
import * as tocbot from "tocbot";

import useWindowSize from "@/hooks/useWindowSize";

type Props = {
  isSide?: boolean;
};

const TARGET_NODES = "h1, h2, h3, h4, h5, h6";

// @see https://tscanlin.github.io/tocbot/
export const TOC = ({ isSide = false }: Props) => {
  const unmountRef = useRef(false);
  const size = useWindowSize();
  const isDesktop = size.width >= 1080;
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const isUnnecessary = (isDesktop && !isSide) || (!isDesktop && isSide);
    const isExists = !!document.querySelectorAll("h2, h3, h4, h5, h6")?.length;

    if (!unmountRef.current) {
      setIsHidden(isUnnecessary || !isExists);
    }

    return () => {
      unmountRef.current = true;
    };
  }, [isDesktop, isSide]);

  useEffect(() => {
    if (isHidden) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {};
    }

    tocbot.init({
      tocSelector: "#js-toc",
      contentSelector: "#js-toc-content",
      headingSelector: TARGET_NODES,
      hasInnerContainers: true,
      orderedList: false,
      headingsOffset: 100,
      scrollSmoothOffset: -48,
    });

    return () => {
      tocbot.destroy();
    };
  }, [isHidden]);

  // eslint-disable-next-line tailwindcss/no-custom-classname
  return isHidden ? null : <aside id="js-toc" className="toc" />;
};

export default memo(TOC);
