import { Months } from "./constants";

export function getPrettyDate(date: Date): string {
  let res =
    String(date.getHours()).padStart(2, "0") +
    ":" +
    date.getMinutes() +
    " on the ";
  const day = date.getDate();
  let suffix = "";
  switch (day) {
    case 1:
      suffix = "st";
      break;
    case 2:
      suffix = "nd";
      break;
    case 3:
      suffix = "rd";
      break;
    default:
      suffix = "th";
  }
  res +=
    day + suffix + " of " + Months[date.getMonth()] + " " + date.getFullYear();
  return res;
}
