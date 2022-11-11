import { withSentry } from "@sentry/nextjs";
import type { MicroCMSQueries } from "microcms-js-sdk";
import type { NextApiRequest, NextApiResponse } from "next";
import z from "zod";

import { getArticles } from "@/services/article";

const articlesQuerySchema = z.object({
  filters: z.string().optional(),
  limit: z
    .string()
    .optional()
    .default("10")
    .transform((v) => Number(v)),
  offset: z
    .string()
    .optional()
    .default("0")
    .transform((v) => Number(v)),
  pageIndex: z.string().optional(),
  q: z.string().optional(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const parsed = articlesQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    return res.status(400).json({ message: "Bad Request" });
  }

  const queries: MicroCMSQueries = {
    orders: "-publishedAt",
    ...parsed.data,
  };

  const data = await getArticles(queries);

  res.status(200).json(data);
};

export default withSentry(handler);
