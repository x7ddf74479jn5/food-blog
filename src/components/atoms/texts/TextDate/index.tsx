import { formatISO } from "date-fns";

import { formatJpYYYYMD } from "@/utils/date/format";

type Props = {
  date: Date;
};

export const TextDate = ({ date }: Props) => {
  return (
    <time dateTime={formatISO(date)}>
      <span>{formatJpYYYYMD(date)}</span>
    </time>
  );
};

export default TextDate;
