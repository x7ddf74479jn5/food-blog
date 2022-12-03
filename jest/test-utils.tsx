import type Queries from "@testing-library/dom/types/queries";
import type { RenderResult } from "@testing-library/react";
import { render } from "@testing-library/react";
import type { RequestHandler } from "msw";
import { setupServer } from "msw/node";
import { SWRConfig } from "swr";

import { SearchProvider } from "@/components/organisms/SearchArea/SearchContext";

import { withMockRouter } from "./mocks";

export const Providers: React.ComponentType<{ children?: React.ReactNode }> = ({ children }) => {
  return withMockRouter(
    <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
      <SearchProvider>{children}</SearchProvider>
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
  anyImage: expect.stringMatching(/^(data:image\/gif)|\.(png|webp|jpeg|jpg|svg)$/),
  anyWord: expect.stringMatching(/\w+/),
};

type ErrorComponentProps = {
  message?: string;
};
export const ErrorComponent: React.FC<ErrorComponentProps> = ({ message }) => {
  throw new Error(message);
};

export const setupMockServer = (...handlers: RequestHandler[]) => {
  const server = setupServer(...handlers);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  return server;
};
