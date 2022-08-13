import { client } from "@/lib/microcms";
import type { TTag, TTagListResponse } from "@/types";
import { HttpError } from "@/utils/error/Http";

export const fetchTag = async (slug: string): Promise<TTag> => {
  try {
    const data = await client.get<TTagListResponse>({ endpoint: "tags", queries: { filters: `slug[equals]${slug}` } });
    return data.contents[0] ?? [];
  } catch (error) {
    if (error instanceof HttpError) {
      console.error(error);
      throw new Error("タグ情報の取得に失敗しました。");
    }
    throw error;
  }
};

export const fetchTags = async (): Promise<TTag[]> => {
  try {
    const data = await client.get<TTagListResponse>({ endpoint: "tags", queries: { limit: 100 } });
    return data.contents;
  } catch (error) {
    if (error instanceof HttpError) {
      console.error(error);
      throw new Error("タグ情報の取得に失敗しました。");
    }
    throw error;
  }
};

export default fetchTags;
