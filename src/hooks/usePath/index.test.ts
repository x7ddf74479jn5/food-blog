import { renderHook, withMockRouter } from "jest/test-utils";

import { usePath } from ".";

describe("hooks/usePath", () => {
  it("現在のpathが/のときmatchPath('/')がtrue", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      withMockRouter(children, { context: { pathname: "/" } });
    const { result } = renderHook(() => usePath(), { wrapper });
    expect(result.current.matchPath("/")).toBeTruthy();
  });
});
