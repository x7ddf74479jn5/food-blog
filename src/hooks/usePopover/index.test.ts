import { renderHook } from "@testing-library/react";

import { usePopover } from ".";

describe("hooks/usePopover", () => {
  afterAll(() => jest.restoreAllMocks());

  it("OK: アンマウント時イベントリスナーが除去される", async () => {
    const addEventListenerMock = jest.spyOn(document, "addEventListener");
    const removeEventListenerMock = jest.spyOn(document, "removeEventListener");

    const { unmount } = renderHook(() => usePopover());
    expect(addEventListenerMock).toBeCalledWith("mousedown", expect.any(Function));

    unmount();
    expect(removeEventListenerMock).toBeCalledWith("mousedown", expect.any(Function));
  });
});
