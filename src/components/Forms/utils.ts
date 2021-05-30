export const sanitizeFnNumbers = (value: string) => {
  const valueNumbers = value
    .replace(/\D/g, "")
    .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);

  if (valueNumbers === null) {
    return "";
  }

  return !valueNumbers[2]
    ? valueNumbers[1]
    : "(" +
        valueNumbers[1] +
        ") " +
        valueNumbers[2] +
        (valueNumbers[3] ? "-" + valueNumbers[3] : "");
};
