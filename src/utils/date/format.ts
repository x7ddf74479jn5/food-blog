import format from "date-fns/format";

export const formatJpYYYYMD = (date: Date) => format(date, "yyyy年M月d日");
