export function formatDateToDdMmYyyy(date: Date) {
  if (!(date instanceof Date)) {
    date = new Date(date);
    if (isNaN(date.getTime())) {
      return "";
    }
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}
