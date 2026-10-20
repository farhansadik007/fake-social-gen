const UNITS = [
  { value: 1_000_000_000, suffix: "b" },
  { value: 1_000_000, suffix: "m" },
  { value: 1_000, suffix: "k" },
];

export function formatRDNumber(value) {
  const n = Math.max(0, Math.floor(Number(value) || 0));

  // Reddit keeps plain digits below 1k, then uses lowercase k/m/b.
  if (n < 1_000) return String(n);

  for (const { value: unit, suffix } of UNITS) {
    if (n >= unit) {
      const scaled = n / unit;
      const rounded =
        scaled < 10 ? Math.floor(scaled * 10) / 10 : Math.floor(scaled);
      return `${rounded}${suffix}`;
    }
  }

  return String(n);
}
