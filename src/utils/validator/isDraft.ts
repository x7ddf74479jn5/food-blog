type Draft = {
  id: string;
  draftKey: string;
};

export const isDraft = (arg: any): arg is Draft => {
  if (!arg?.draftKey || !arg?.id) {
    return false;
  }
  if (typeof arg.draftKey !== "string") {
    return false;
  }
  if (typeof arg.id !== "string") {
    return false;
  }

  return true;
};
