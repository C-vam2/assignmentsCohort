/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  const myMap = new Map();
  for (let tr in transactions) {
    const category = transactions[tr].category;
    const price = transactions[tr].price;
    if (myMap.has(category)) {
      const value = myMap.get(category);
      myMap.set(category, value + price);
    } else {
      myMap.set(category, price);
    }
  }
  let result = [];
  for (let [key, value] of myMap.entries()) {
    result.push({ category: key, totalSpent: value });
  }
  for (let val in result) {
    console.log(val);
  }
  return result;
}

module.exports = calculateTotalSpentByCategory;
