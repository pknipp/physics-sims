import framerize from './util';

export default function selectionSort(array) {
  const animations = [];
  let startIdx = 0;
  while (startIdx < array.length - 1) {
    let smallestIdx = startIdx;
    for (let i = startIdx + 1; i < array.length; i++) {
      const animation = {};
      animation.comparison = [startIdx, i];
      if (array[i] < array[smallestIdx]) {
        smallestIdx = i;
      }
      if (i === array.length - 1) {
        animation.swap = [startIdx, smallestIdx];
      } else {
        animation.swap = animation.comparison;
      }
      animations.push(animation);
    }
    const tempSmallVal = array[smallestIdx];
    array[smallestIdx] = array[startIdx];
    array[startIdx] = tempSmallVal;
    startIdx += 1;
  }
  return framerize(animations);
};
