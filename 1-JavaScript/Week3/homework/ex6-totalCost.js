'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/tree/main/1-JavaScript/Week3#exercise-6-total-cost-is

You want to buy a couple of things from the supermarket to prepare for a party.
After scanning all the items the cashier wants to give you the total price, but
the machine is broken! Let's write her a function that does it for her
instead!

1. Create an object named `cartForParty` with five properties. Each property
   should be a grocery item (like `beers` or `chips`) and hold a number value
   (like `1.75` or `0.99`).

2. Complete the function called `calculateTotalPrice`.

   - It takes one parameter: an object that contains properties that only contain
     number values.
   - Loop through the object and add all the number values together.
   - Return a string: "Total: €`amount`".

3. Complete the unit test functions and verify that all is working as expected.
-----------------------------------------------------------------------------*/
const cartForParty = {
  cola: 1.5,
  chips: 1.2,
  steak: 5.5,
  balloon: 4.3,
  juice: 3.5,
};

function calculateTotalPrice(cartForParty) {
  let total = 0;
  for (let item in cartForParty) {
    total += cartForParty[item];
  }
  return total;
}

// ! Test functions (plain vanilla JavaScript)
function test1() {
  console.log('\nTest 1: calculateTotalPrice should take one parameter');
  const expected = 1;
  const actual = calculateTotalPrice.length; //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length
  console.assert(expected === actual);
}

function test2() {
  console.log('\nTest 2: return correct output when passed cartForParty');
  const expectedTotal = 16;
  const actualTotal = calculateTotalPrice(cartForParty);
  console.assert(expectedTotal === actualTotal);
}

function test() {
  test1();
  test2();
}

test();
