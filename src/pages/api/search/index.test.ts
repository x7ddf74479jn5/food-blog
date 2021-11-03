import { mockReq, mockRes } from "jest/test-utils";
import { mockArticles } from "mocks/data";
import type { NextApiRequest } from "next";

import * as fetchArticles from "@/utils/fetcher/fetchArticles";

import search from "./index.page";

describe("pages/api/search", () => {
  const spyFetchArticles = jest.spyOn(fetchArticles, "fetchArticles");
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.restoreAllMocks());

  it("OK: 正常系", async () => {
    const _mockReq = {
      ...mockReq,
      query: {
        q: "query",
        offset: "0",
        limit: "1",
      },
    } as unknown as NextApiRequest;

    const articles = Object.values(mockArticles);
    spyFetchArticles.mockImplementation(async () => {
      return { contents: articles, totalCount: articles.length, limit: 1, offset: 0 };
    });

    await search(_mockReq, mockRes);

    expect(spyFetchArticles).toBeCalledWith({
      q: "query",
      offset: 0,
      limit: 1,
      orders: "-publishedAt",
    });
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith({ contents: articles, totalCount: articles.length, limit: 1, offset: 0 });
  });

  it("NG: qが不正", async () => {
    const _mockReq = {
      ...mockReq,
      query: {
        q: undefined,
        offset: "0",
        limit: "1",
      },
    } as unknown as NextApiRequest;

    await search(_mockReq, mockRes);

    expect(spyFetchArticles).not.toBeCalled();
    expect(mockRes.status).toBeCalledWith(404);
  });
});
