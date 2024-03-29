import { withSentry } from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import z from "zod";

import { getArticle } from "@/services/article";
import { urlTable } from "@/utils/paths/url";

const previewQuerySchema = z.object({
  draftKey: z.string().refine((value) => Boolean(value.trim().length)),
  id: z.string().refine((value) => Boolean(value.trim().length)),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const parsed = previewQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    return res.status(400).json({ message: "Bad Request" });
  }

  const { draftKey, id } = parsed.data;

  const content = await getArticle(id, { draftKey: draftKey });

  if (!content) {
    return res.status(404).json({ message: "Not Found" });
  }

  res.setPreviewData({
    content,
  });

  res.writeHead(307, { Location: `${urlTable.preview}/${content.id}` });
  res.end("Preview mode enabled");
};

export default withSentry(handler);
