import framerize from './util';

export default function quickSort(array) {
  // Write your code here.
  const frames = framerize(quickSortHelper(array, 0, array.length - 1));
  return frames;
}

function quickSortHelper(array, startIdx, endIdx, animations = []) {
  if (startIdx >= endIdx) return;
  const pivotIdx = startIdx;
  let leftIdx = startIdx + 1;
  let rightIdx = endIdx;
  while (rightIdx >= leftIdx) {
    const animation = {};
    animation.comparison = [leftIdx, rightIdx, pivotIdx]
    if (array[leftIdx] > array[pivotIdx] && array[rightIdx] < array[pivotIdx]) {
      swap(array, leftIdx, rightIdx);
      animation.swap = [leftIdx, rightIdx, pivotIdx];
    } else {
      animation.swap = [0, 0, pivotIdx]
    }
    animations.push(animation);
    if (array[leftIdx] <= array[pivotIdx]) leftIdx += 1;
    if (array[rightIdx] >= array[pivotIdx]) rightIdx -= 1;
  }
  swap(array, pivotIdx, rightIdx);
  const animation = {};
  animation.comparison = [pivotIdx, rightIdx, pivotIdx];
  animation.swap = [pivotIdx, rightIdx, pivotIdx];
  animations.push(animation);
  const leftSubArrIsSmaller = rightIdx - 1 - startIdx < endIdx - (rightIdx + 1)
  if (leftSubArrIsSmaller) {
    quickSortHelper(array, startIdx, rightIdx - 1, animations);
    quickSortHelper(array, rightIdx + 1, endIdx, animations);
  } else {
    quickSortHelper(array, rightIdx + 1, endIdx, animations);
    quickSortHelper(array, startIdx, rightIdx - 1, animations);
  }
  return animations
}

function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
