import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

export const formatJpYYYYMD = (date: Date) => format(date, "yyyy年M月d日");

// publishedAtが存在しないケースがあるための対策
export const getSafeDate = (_date: any): Date => {
  const current = new Date();
  let date = _date ?? current;
  if (typeof date === "string") {
    date = new Date(date);
  }

  return Number.isNaN(date.getTime()) ? current : date;
};

export const isValidISODate = (dateString: string) => {
  return parseISO(dateString).toString() !== "Invalid Date";
};
