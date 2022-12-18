import crypto from "node:crypto";

import type { NextApiHandler } from "next";
import z from "zod";

import { urlTable } from "@/utils/paths/url";

const headerSchema = z.object({
  "X-MICROCMS-Signature": z.string().min(0),
});

const bodySchema = z.object({
  id: z.string().min(0),
});

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const expectedSignature = crypto
    .createHmac("sha256", process.env.ON_DEMAND_SECRET_TOKEN)
    .update(JSON.stringify(req.body))
    .digest("hex");
  const headerResult = headerSchema.safeParse(req.headers);

  if (!headerResult.success) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const signature = headerResult.data["X-MICROCMS-Signature"];

  try {
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return res.status(401).json({ message: "Invalid token" });
    }
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }

  const queryResult = bodySchema.safeParse(req.body);

  if (!queryResult.success) {
    return res.status(404).json({ message: "Not Found" });
  }

  try {
    await res.revalidate(`${urlTable.articles}/${queryResult.data.id}`);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
};

export default handler;
