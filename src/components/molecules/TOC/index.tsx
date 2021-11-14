import { memo, useEffect, useRef, useState } from "react";
import * as tocbot from "tocbot";

import { SideSectionContainer } from "@/components/atoms/containers/SideSectionContainer";
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
  });
  // eslint-disable-next-line tailwindcss/no-custom-classname
  return isHidden ? null : (
    <SideSectionContainer header="目次">
      <div id="js-toc" className="toc" />
    </SideSectionContainer>
  );
};

export default memo(TOC);
