import { useEffect, useState } from "react";

export const useMount = () => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isMounted;
};
