export function formatDateToDdMmYyyy(date: Date) {
  if (!(date instanceof Date)) {
    date = new Date(date);
    if (isNaN(date.getTime())) {
      return "";
    }
  }

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}
