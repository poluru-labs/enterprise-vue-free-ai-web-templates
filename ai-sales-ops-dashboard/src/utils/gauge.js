export function clampPercent(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 0;
  return Math.min(100, Math.max(0, numeric));
}

export function gaugeMetrics(percent, radius = 26) {
  const value = clampPercent(percent);
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);
  return { radius, circumference, offset, value };
}

export function barLayout(values, { width = 360, height = 128, gap = 6, pad = 8 } = {}) {
  if (!Array.isArray(values) || values.length === 0) return [];
  const max = Math.max(...values, 1);
  const inner = width - pad * 2;
  const barW = Math.max(4, (inner - gap * (values.length - 1)) / values.length);
  return values.map((value, index) => {
    const h = (value / max) * (height - 24);
    return {
      x: pad + index * (barW + gap),
      y: height - 16 - h,
      width: barW,
      height: h,
      value,
    };
  });
}
