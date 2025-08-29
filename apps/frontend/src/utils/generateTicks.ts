export function generateTicks(max: number, steps = 5): number[] {
  if (max <= 0) return [0];

  if (max <= steps) {
    return Array.from({ length: max + 1 }, (_, i) => i);
  }

  const rawStep = max / steps;
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const normalized = rawStep / magnitude;

  let step;
  if (normalized < 1.5) step = 1;
  else if (normalized < 3) step = 2;
  else if (normalized < 7) step = 5;
  else step = 10;

  step *= magnitude;

  const ticks = [];
  for (let v = 0; v <= max; v += step) {
    ticks.push(v);
  }
  if (ticks[ticks.length - 1] !== max) {
    ticks.push(max);
  }

  return ticks;
}
