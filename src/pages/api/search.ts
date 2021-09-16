import type { NextApiRequest, NextApiResponse } from "next";

import { client } from "@/lib/client";
import type { TArticleListResponse } from "@/types";

const search = async (req: NextApiRequest, res: NextApiResponse) => {
  const { q, offset, limit } = req.query;
  if (typeof q !== "string") {
    res.status(404).end();
    return;
  }

  const data = await client.get<TArticleListResponse>({
    endpoint: "articles",
    queries: { q: q, limit: Number(limit) ?? 5, offset: Number(offset) ?? 0, orders: "-publishedAt" },
  });
  res.status(200).json(data);
};

export default search;
