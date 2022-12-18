// @jest-environment node
import crypto from "node:crypto";

import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { testApiHandler } from "next-test-api-route-handler";

import handler from ".";

describe("src/pages/api/revalidate", () => {
  const mockRevalidate = jest.fn();
  const wrappedHandler = ((req: NextApiRequest, res: NextApiResponse & { revalidate: jest.Mock }) => {
    const _res = { ...res, revalidate: mockRevalidate } as unknown as NextApiResponse;
    handler(req, _res);
  }) as NextApiHandler;
  const params = {
    handler: wrappedHandler,
    url: "/api/revalidate",
  };
  const oKBody = {
    id: "articleId",
  };
  const expectedSignature = crypto
    .createHmac("sha256", process.env.ON_DEMAND_SECRET_TOKEN)
    .update(JSON.stringify(oKBody))
    .digest("hex");
  const okHeaders = { "X-MICROCMS-Signature": expectedSignature };

  describe("POST", () => {
    test("200", async () => {
      await testApiHandler({
        ...params,
        requestPatcher: (req) => (req.headers = okHeaders),
        test: async ({ fetch }) => {
          const res = await fetch({ body: JSON.stringify(oKBody), method: "POST" });
          expect(res.status).toEqual(200);
          await expect(res.json()).resolves.toStrictEqual({ revalidated: true });
          expect(mockRevalidate).lastCalledWith("/articles/articleId");
        },
      });
    });

    test("401: Invalid token(empty)", async () => {
      await testApiHandler({
        ...params,
        requestPatcher: (req) => (req.headers = { "X-MICROCMS-Signature": "" }),
        test: async ({ fetch }) => {
          const res = await fetch({ body: JSON.stringify(oKBody), method: "POST" });
          expect(res.status).toEqual(401);
          await expect(res.json()).resolves.toStrictEqual({
            message: "Invalid token",
          });
        },
      });
    });

    test("404: Invalid token", async () => {
      await testApiHandler({
        ...params,
        requestPatcher: (req) => (req.headers = { "X-MICROCMS-Signature": "invalid" }),
        test: async ({ fetch }) => {
          const res = await fetch({ body: JSON.stringify(oKBody), method: "POST" });
          expect(res.status).toEqual(401);
          await expect(res.json()).resolves.toStrictEqual({
            message: "Invalid token",
          });
        },
      });
    });

    test("405: Method Not Allowed", async () => {
      await testApiHandler({
        ...params,
        requestPatcher: (req) => (req.headers = okHeaders),
        test: async ({ fetch }) => {
          const res = await fetch({ method: "GET" });
          expect(res.status).toEqual(405);
          await expect(res.json()).resolves.toStrictEqual({
            message: "Method Not Allowed",
          });
        },
      });
    });
  });
});
