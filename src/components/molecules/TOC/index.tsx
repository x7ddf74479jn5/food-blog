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
    const isExists = !!document.querySelectorAll("h2, h3, h4, h5, h6")?.length;

    if (!unmountRef.current) {
      setIsHidden(!isExists);
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
  return isHidden ? null : (
    <aside className="lg:sticky top-3 mb-4 w-full lg:w-1/3 h-full text-sm dark:text-white bg-gray-50 dark:bg-gray-700">
      <h2 className="pt-2 pb-2 pl-2 border-b-2">目次</h2>
      <div id="js-toc" className="toc" />
    </aside>
  );
};

export default memo(TOC);
