import type { ReactElement, ReactNode } from "react";
import { createContext, useContext } from "react";

import { useMedia } from "./useMedia";

export type ViewportContextState = {
  isMobile: boolean;
  isPC: boolean;
};

export const defaultValue: ViewportContextState = {
  isMobile: false,
  isPC: false,
};

const ViewportContext = createContext<ViewportContextState>(defaultValue);

type Props = {
  children: ReactNode;
};

export const ViewportProvider = ({ children }: Props): ReactElement => {
  const isMobile = useMedia("<=", "sm");
  const isPC = useMedia(">=", "lg");

  return <ViewportContext.Provider value={{ isMobile, isPC }}>{children}</ViewportContext.Provider>;
};

export const useViewport = () => {
  return useContext(ViewportContext);
};
