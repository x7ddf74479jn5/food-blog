import { useCallback, useEffect, useRef, useState } from "react";

export const usePopover = <E extends HTMLElement>() => {
  const ref = useRef<E>(null);
  const [isActive, _setIsActive] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        _setIsActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const setIsActive = useCallback((flag: boolean) => _setIsActive(flag), []);

  return {
    ref,
    isActive,
    setIsActive,
  };
};
