export function formatDCTime(createdAt) {
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return "";

  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  const startOfDay = (value) =>
    new Date(value.getFullYear(), value.getMonth(), value.getDate()).getTime();

  const dayDiff = Math.round(
    (startOfDay(new Date()) - startOfDay(date)) / 86_400_000,
  );

  if (dayDiff === 0) return `Today at ${time}`;
  if (dayDiff === 1) return `Yesterday at ${time}`;

  return date.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
}
