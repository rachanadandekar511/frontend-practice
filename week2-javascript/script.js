console.log("Line 1");
console.log("Line 2");
console.log("Line 3");
console.log("Line 4");
console.log(document.body);
const firstName = "Rachana";
let age = 30;
console.log(name, age);
age = 31;
console.log(typeof("hello"));
console.log(typeof 42);
console.log(typeof 3.14);
console.log(typeof true);
console.log(typeof undefined);
console.log(typeof null);
console.log(typeof[1,2,3]);
console.log(Array.isArray([1,2,3]));

let x = 5;
console.log(typeof x);

x= "five";
console.log(typeof x);

const city = "Mumbai";
console.log(`Hello ${firstName}, you are ${age} and live in ${city}`);

console.log(`2+3 = ${2+3}`);

const book = {title:"Sapiens", pages:443};
console.log(book.title);

const fruits = ["apple", "mango"];
console.log(fruits[0]);
fruits.push("banana");
console.log(fruits);

book.pages = 445;
console.log(book.pages);

console.log(5+3);
console.log(typeof(5+3));

console.log("5" + 3);
console.log(typeof("5" + 3));

console.log("10" * 2);
console.log(typeof("10"*2));

console.log("abc" - 1);
console.log(typeof("abc"-1));

console.log("5"-1);
console.log(typeof("5"-1));

console.log(0.1+0.2);
console.log((0.1+0.2).toFixed(2));

console.log(5 === 5);
console.log(5==="5");
console.log(5=="5");
console.log(5 !== "5");
console.log(0 == false);
console.log(0===false);

console.log(Boolean(0));
console.log(Boolean(""));
console.log(Boolean(null));
console.log(Boolean("Hello"));
console.log(Boolean([]));
console.log(Boolean("0"));

const userName = " ";
if(userName)
{
    console.log("Has a name");
}
else
{
    console.log("No name given");
}
