export function formatFBDate(createdAt) {
  const created = new Date(createdAt);
  if (Number.isNaN(created.getTime())) return "";

  const minutes = Math.floor((Date.now() - created.getTime()) / 60_000);
  if (minutes < 1) return "Just now";

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;

  return created.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year:
      created.getFullYear() === new Date().getFullYear() ? undefined : "numeric",
  });
}
