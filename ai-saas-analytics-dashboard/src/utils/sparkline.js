export function sparkPoints(values, width = 220, height = 56) {
  if (!Array.isArray(values) || values.length === 0) return '';
  if (values.length === 1) {
    return `0,${(height / 2).toFixed(1)} ${width.toFixed(1)},${(height / 2).toFixed(1)}`;
  }
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / span) * height;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

export function sparkLastPoint(values, width = 220, height = 56) {
  if (!Array.isArray(values) || values.length === 0) {
    return { cx: width, cy: height / 2 };
  }
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const last = values[values.length - 1];
  return {
    cx: width,
    cy: height - ((last - min) / span) * height,
  };
}
