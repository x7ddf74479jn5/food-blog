import type Queries from "@testing-library/dom/types/queries";
import type { RenderResult } from "@testing-library/react";
import { render } from "@testing-library/react";
import { SWRConfig } from "swr";

import { SearchHistoryProvider } from "@/context";

import { mockRouter, RouterContext } from "./mocks";

// const mockInitialState = {};

// const mockContextValue = {};

export const Providers: React.ComponentType<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
      <RouterContext.Provider value={mockRouter}>
        <SearchHistoryProvider>{children}</SearchHistoryProvider>
      </RouterContext.Provider>
    </SWRConfig>
  );
};

const customRender = (ui: React.ReactElement, options = {}): RenderResult<typeof Queries, HTMLElement> => {
  return render(ui, { wrapper: Providers, ...options });
};

// re-export everything
export * from "./mocks";
export * from "@testing-library/react";

// override render method
export { customRender as render };

export const reTestCase = {
  anyWord: expect.stringMatching(/\w+/),
  anyImage: expect.stringMatching(/^(data:image\/gif)|\.(png|webp|jpeg|jpg|svg)$/),
};

type ErrorComponentProps = {
  message?: string;
};
export const ErrorComponent: React.VFC<ErrorComponentProps> = ({ message }) => {
  throw new Error(message);
};
