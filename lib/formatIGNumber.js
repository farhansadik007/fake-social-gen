const UNITS = [
  { value: 1_000_000_000, suffix: "B" },
  { value: 1_000_000, suffix: "M" },
  { value: 1_000, suffix: "K" },
];

export function formatIGNumber(value) {
  const n = Math.max(0, Math.floor(Number(value) || 0));

  // Instagram keeps full comma-separated numbers until 10K, then abbreviates.
  if (n < 10_000) return n.toLocaleString("en-US");

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
