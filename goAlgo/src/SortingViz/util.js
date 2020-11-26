export default function framerize(array) {
  const framedAnimations = [];
  for (const frame of array) {
    // if (frame === undefined) continue;
    framedAnimations.push(frame.comparison);
    framedAnimations.push(frame.comparison);
    framedAnimations.push(frame.swap);
  }
  return framedAnimations;
}
