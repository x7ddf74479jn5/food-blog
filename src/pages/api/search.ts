import type { NextApiRequest, NextApiResponse } from "next";

import { client } from "@/lib/client";
import type { TArticleListResponse } from "@/types";

const search = async (req: NextApiRequest, res: NextApiResponse) => {
  if (typeof req.query.q !== "string") {
    res.status(404).end();
    return;
  }
  // const offset =

  const data = await client.get<TArticleListResponse>({
    endpoint: "articles",
    queries: { q: req.query.q, limit: 10, orders: "-publishedAt" },
  });
  res.status(200).json(data);
};

export default search;
