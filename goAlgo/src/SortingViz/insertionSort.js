import framerize from './util';

export default function insertionSort(array) {
  const animations = [];
  for (let i = 1; i < array.length; i++) {
    let j = i;
    animations.push({ comparison: [j, j - 1], swap: [0, 0] });
    console.log(animations[0])

    while (j > 0 && array[j] < array[j - 1]) {
      swap(j, j - 1, array);
      animations.push({ comparison: [j, j - 1], swap: [j, j - 1] });
      j -= 1;

    }
  }
  return framerize(animations);
}

function swap(i, j, array) {
  const temp = array[i];
  array[i] = array[j]
  array[j] = temp
}
