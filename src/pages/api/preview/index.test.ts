import { mockReq, mockRes } from "jest/test-utils";
import { mockArticles } from "mocks/data";
import type { NextApiRequest } from "next";

import * as fetchArticles from "@/utils/fetcher/fetchArticles";

import preview from "./index.page";

describe("pages/api/preview", () => {
  const spyFetchArticle = jest.spyOn(fetchArticles, "fetchArticle");
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.restoreAllMocks());

  it("OK: 正常系", async () => {
    const _mockReq = {
      ...mockReq,
      query: {
        slug: "slug",
        draftKey: "draftKey",
      },
    } as unknown as NextApiRequest;
    const articleStock = mockArticles.stock;
    spyFetchArticle.mockImplementation(async () => {
      return articleStock;
    });

    await preview(_mockReq, mockRes);

    expect(spyFetchArticle).toBeCalledWith("slug", { draftKey: "draftKey" });
    expect(mockRes.setPreviewData).toBeCalledWith({
      slug: articleStock.id,
      draftKey: "draftKey",
    });
    // eslint-disable-next-line @typescript-eslint/naming-convention
    expect(mockRes.writeHead).toBeCalledWith(307, { Location: `/preview/${articleStock.id}` });
    expect(mockRes.end).toBeCalledWith("Preview mode enabled");
  });

  it("NG: slugが不正", async () => {
    const _mockReq = {
      ...mockReq,
      query: {
        slug: undefined,
      },
    } as unknown as NextApiRequest;

    await preview(_mockReq, mockRes);

    expect(spyFetchArticle).not.toBeCalled();
    expect(mockRes.status).toBeCalledWith(404);
  });

  it("NG: draftKeyが不正", async () => {
    const _mockReq = {
      ...mockReq,
      query: {
        slug: "slug",
        draftKey: undefined,
      },
    } as unknown as NextApiRequest;

    await preview(_mockReq, mockRes);

    expect(spyFetchArticle).not.toBeCalled();
    expect(mockRes.status).toBeCalledWith(400);
  });

  it("NG: slugが不正", async () => {
    const _mockReq = {
      ...mockReq,
      query: {
        slug: undefined,
      },
    } as unknown as NextApiRequest;

    await preview(_mockReq, mockRes);

    expect(spyFetchArticle).not.toBeCalled();
    expect(mockRes.status).toBeCalledWith(404);
  });

  it("NG: 記事が取得できない", async () => {
    const _mockReq = {
      ...mockReq,
      query: {
        slug: "slug",
        draftKey: "draftKey",
      },
    } as unknown as NextApiRequest;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    spyFetchArticle.mockReturnValue(undefined);

    await preview(_mockReq, mockRes);

    expect(spyFetchArticle).toBeCalledWith("slug", { draftKey: "draftKey" });
    expect(mockRes.status).toBeCalledWith(401);
    expect(mockRes.json).toBeCalledWith({ message: "Invalid slug" });
  });
});
