const UNITS = [
  { value: 1_000_000_000, suffix: "B" },
  { value: 1_000_000, suffix: "M" },
  { value: 1_000, suffix: "K" },
];

export function formatFBNumber(value) {
  const n = Math.max(0, Math.floor(Number(value) || 0));

  // Facebook abbreviates from 1K up, leaving small counts as plain numbers.
  if (n < 1_000) return String(n);

  for (const { value: unit, suffix } of UNITS) {
    if (n >= unit) {
      const scaled = n / unit;
      const rounded =
        scaled >= 100 ? Math.round(scaled) : Math.round(scaled * 10) / 10;
      return `${rounded}${suffix}`;
    }
  }

  return String(n);
}
