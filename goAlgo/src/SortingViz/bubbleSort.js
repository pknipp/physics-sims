import framerize from './util';

export default function bubbleSort(array) {
  const animations = []
  let swapped = true;
  while (swapped) {
    swapped = false;
    for (let i = 0; i < array.length - 1; i++) {
      const animation = {};
      animation.comparison = [i, i + 1];
      if (array[i] > array[i + 1]) {
        animation.swap = [i + 1, i];
        const first = array[i];
        const second = array[i + 1];
        array[i] = second;
        array[i + 1] = first;
        swapped = true;
      } else {
        animation.swap = [i, i + 1];
      }
      animations.push(animation)
    }
  }
  return framerize(animations);
}
