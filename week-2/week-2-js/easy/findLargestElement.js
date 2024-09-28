/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
  let maxi = numbers[0];
  for (let ele of numbers) {
    if (ele > maxi) {
      maxi = ele;
    }
  }
  return maxi;
}

module.exports = findLargestElement;
