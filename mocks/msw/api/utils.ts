import type { DefaultRequestBody, RestRequest } from "msw";

export const getSearchParams = (req: RestRequest<DefaultRequestBody, Record<string, any>>) => {
  const apiKey = req.headers.get("X-API-KEY");
  let limit = req.url.searchParams.get("limit") ?? 5;
  limit = Number(limit);
  const offset = Number(req.url.searchParams.get("offset")) ?? 0;
  const filters = req.url.searchParams.get("filters");
  return { apiKey, limit, offset, filters };
};

export const findContent = <T extends Record<string, any>>(id: string, objects: Record<string, T>): T | undefined => {
  return Object.values(objects).find((obj) => {
    return "id" in obj ? obj.id === id : false;
  });
};

export type MatchedGroup<T> = {
  key: keyof T;
  operator: "equals";
  value: string;
};

export const isMatchedAgainstFilters = <T extends Record<string, any>>(filters: string): MatchedGroup<T> | false => {
  const re = /(?<key>\w*)\[(?<operator>\w*)\](?<value>\w*)/;
  const matched = filters.match(re);
  if (!matched?.groups) return false;

  return {
    key: matched?.groups.key,
    operator: matched?.groups.operator,
    value: matched.groups.value,
  } as MatchedGroup<T>;
};

export const findContentsBySlug = <T extends Record<string, any>>(
  objects: Record<string, T>,
  group: MatchedGroup<T>
) => {
  const { key, operator, value } = group;

  switch (operator) {
    case "equals": {
      return Object.values(objects).filter((obj) => obj[key] === value);
    }
    default: {
      const _checker: never = operator;
      throw new Error(`Invalid operator as ${_checker}`);
    }
  }
};
