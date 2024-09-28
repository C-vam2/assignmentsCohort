/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  str = str.toLowerCase().split(" ").join("");
  let i = 0,
    j = str.length - 1;
  while (i < j) {
    while (i < j && !(str[i] >= "a" && str[i] <= "z")) i = i + 1;
    while (i < j && !(str[j] >= "a" && str[j] <= "z")) j = j - 1;
    if (str[i] != str[j]) return false;
    i += 1;
    j -= 1;
  }
  return true;
}

module.exports = isPalindrome;
