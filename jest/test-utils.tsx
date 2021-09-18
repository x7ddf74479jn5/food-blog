/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import type Queries from "@testing-library/dom/types/queries";
import type { RenderResult } from "@testing-library/react";
import { render } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import NextImage from "next/image";
import type { NextRouter } from "next/router";
import React from "react";

export const setupWindow = () => {
  return Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };
    }),
  });
};

export const mockNextImage = () => {
  return Object.defineProperty(NextImage, "default", {
    configurable: true,
    value: (props: any) => {
      const { width, height } = props;
      if (width === undefined || height === undefined) return <img {...props} />;
      const _width = typeof width === "string" ? parseInt(width) : width;
      const _height = typeof height === "string" ? parseInt(height) : height;
      const ratio = (_height / _width) * 100;
      return (
        <div
          style={{
            paddingBottom: `${ratio}%`,
            position: "relative",
          }}
        >
          <img
            style={{
              objectFit: "cover",
              position: "absolute",
              minWidth: "100%",
              minHeight: "100%",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
            {...props}
          />
        </div>
      );
    },
  });
};

const mockRouter: NextRouter = {
  route: "/",
  pathname: "/",
  query: {},
  asPath: "/",
  basePath: "/",
  isLocaleDomain: true,
  isReady: true,
  push: jest.fn(),
  prefetch: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isPreview: false,
};

export const withMockedRouter = (
  router: Partial<NextRouter> = {},
  children: React.ReactElement
): React.ReactElement => {
  const mockedRouter: NextRouter = {
    ...mockRouter,
    ...router,
  };

  return <RouterContext.Provider value={mockedRouter}>{children}</RouterContext.Provider>;
};

// const mockInitialState = {};

// const mockContextValue = {};

export const Providers: React.ComponentType<{ children?: React.ReactNode }> = ({ children }) => {
  return <RouterContext.Provider value={mockRouter}>{children}</RouterContext.Provider>;
};

const customRender = (ui: React.ReactElement, options = {}): RenderResult<typeof Queries, HTMLElement> => {
  return render(ui, { wrapper: Providers, ...options });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };

export const reTestCase = {
  anyWord: expect.stringMatching(/\w+/),
  anyImage: expect.stringMatching(/^(data:image\/gif)|\.(png|webp|jpeg|jpg|svg)$/),
};
