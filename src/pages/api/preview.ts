import type { NextApiRequest, NextApiResponse } from "next";

import { client } from "@/lib/client";
import type { TArticle } from "@/types/index";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.slug) {
    return res.status(404).end();
  }

  if (typeof req.query.slug !== "string" || typeof req.query.draftKey !== "string") {
    return res.status(400).end();
  }

  const content = await client.get<TArticle>({
    endpoint: "articles",
    contentId: req.query.slug,
    queries: { draftKey: req.query.draftKey },
  });

  if (!content) {
    return res.status(401).json({ message: "Invalid slug" });
  }

  res.setPreviewData({
    slug: content.id,
    draftKey: req.query.draftKey,
  });
  // eslint-disable-next-line @typescript-eslint/naming-convention
  res.writeHead(307, { Location: `/preview/${content.id}` });
  res.end("Preview mode enabled");
};

export default handler;
