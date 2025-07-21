import { Dayjs } from "dayjs";

export const generateTimeOptions = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      times.push(timeString);
    }
  }
  return times.map((time) => ({ value: time, label: time }));
};

export function formatToJapaneseDate(date: Dayjs) {
  const year = date.year();
  const month = date.month() + 1;
  const day = date.date();
  return `${year}年${month}月${day}日`;
}
