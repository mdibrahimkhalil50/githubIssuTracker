1.  What is the difference between var, let, and const?

var
var is the old way to declare variables in JavaScript.
It can be changed and redeclared.
It does not follow block scope properly.

Example:
var name = "ibrahim";
var name = "Khalil"; // allowed

let
let is a modern way to declare variables.
Its value can change.
It works inside block scope ({ }).

Example:
let age = 20;
age = 21; // allowed

const
const is also block scoped.
Its value cannot be reassigned.
Use it when the value should stay fixed.

Example:
const country = "Bangladesh";
// country = "Pakistan"; // error

2.  What is the spread operator (...)?

The spread operator (...) is used to copy or expand arrays and objects.
-use spread operator
    Copy arrays
    Merge objects
    Add new values easily
3. What is the difference between map(), filter(), and forEach()?

map()
  Creates a new array.
  Changes every item based on logic.


filter()
  Creates a new array.
  Keeps only matching items.

forEach()
  Runs code for every item.
  Does not return a new array.

4. What is an arrow function?

Arrow function is a short way to write functions in JavaScript.
example:
const add = (a, b) => {return a + b;};


5. What are template literals?

Template literals are used to write strings in an easier and cleaner way using backticks (`).
use template literals
  Easy variable insertion
  Supports multi-line strings
  Cleaner code

Example:
const name = "Rahim";
const age = 22;

const text = `My name is ${name} and I am ${age} years old.`;
console.log(text);
