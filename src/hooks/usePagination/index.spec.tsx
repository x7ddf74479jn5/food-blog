import type { RenderResult } from "@testing-library/react-hooks";
import { act } from "@testing-library/react-hooks";
import { renderHook } from "@testing-library/react-hooks";

import usePagination from "@/hooks/usePagination";

describe("hooks/usePagination", () => {
  let renderResult: RenderResult<ReturnType<typeof usePagination>>;
  const mockOnIntersect = jest.fn();
  window.IntersectionObserver = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("OK: APIが定義されている", () => {
    renderResult = renderHook(() => usePagination({ onIntersect: mockOnIntersect })).result;
    expect(renderResult.current.loadMoreRef).toBeDefined();

    const el = document.createElement("div");
    act(() => renderResult.current.loadMoreRef(el));
    expect(window.IntersectionObserver).toBeCalledWith(expect.any(Function), {
      root: null,
      onIntersect: mockOnIntersect(),
      rootMargin: "0px",
      threshold: 1.0,
    });
  });

  it("OK: observerのライフサイクル", () => {
    const mockObserve = jest.fn();
    const mockUnobserve = jest.fn();
    (window.IntersectionObserver as jest.Mock).mockReturnValue({ observe: mockObserve, unobserve: mockUnobserve });

    const { result, unmount } = renderHook(() => usePagination({ onIntersect: mockOnIntersect }));
    renderResult = result;
    expect(renderResult.current.loadMoreRef).toBeDefined();

    const el = document.createElement("div");
    act(() => renderResult.current.loadMoreRef(el));
    expect(window.IntersectionObserver).toBeCalledTimes(1);
    expect(mockObserve).toBeCalledWith(el);

    const el2 = document.createElement("div");
    act(() => renderResult.current.loadMoreRef(el2));
    expect(window.IntersectionObserver).toBeCalledTimes(2);
    expect(mockObserve).toBeCalledWith(el2);

    unmount();
    expect(mockUnobserve).toBeCalledWith(el2);
  });
});
