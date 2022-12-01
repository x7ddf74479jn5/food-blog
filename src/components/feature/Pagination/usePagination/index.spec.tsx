import { act, renderHook } from "@testing-library/react";

import usePagination from ".";

describe("components/feature/Pagination/usePagination", () => {
  const mockOnIntersect = jest.fn();
  window.IntersectionObserver = jest.fn();
  const mockObserve = jest.fn();
  const mockUnobserve = jest.fn();
  (window.IntersectionObserver as jest.Mock).mockReturnValue({
    observe: mockObserve,
    unobserve: mockUnobserve,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("OK: APIが定義されている", () => {
    const { result } = renderHook(() => usePagination({ onIntersect: mockOnIntersect }));
    expect(result.current.loadMoreRef).toBeDefined();

    const el = document.createElement("div");
    act(() => result.current.loadMoreRef(el));
    expect(window.IntersectionObserver).toBeCalledWith(expect.any(Function), {
      onIntersect: mockOnIntersect(),
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });
  });

  it("OK: observerのライフサイクル", () => {
    const { result, unmount } = renderHook(() => usePagination({ onIntersect: mockOnIntersect }));
    expect(result.current.loadMoreRef).toBeDefined();

    const el = document.createElement("div");
    act(() => result.current.loadMoreRef(el));
    expect(window.IntersectionObserver).toBeCalledTimes(1);
    expect(mockObserve).toBeCalledWith(el);

    const el2 = document.createElement("div");
    act(() => result.current.loadMoreRef(el2));
    expect(window.IntersectionObserver).toBeCalledTimes(2);
    expect(mockObserve).toBeCalledWith(el2);

    unmount();
    expect(mockUnobserve).toBeCalledWith(el2);
  });
});
