export const isValidTitle = (value: string | undefined) => {
  if (value !== "") return true;
  return false;
};
export const isValidDescription = (value: string | undefined) => {
  if (value !== "") return true;
  return false;
};

export const onAccessRef = (ref: any) => {
  if (!ref.current.value) return "";
  return ref.current.value;
};
