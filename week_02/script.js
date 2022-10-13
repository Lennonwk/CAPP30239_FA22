
// integer

/*
this is a block comment 
*/

let num = 100; //integer

// function foo() {
//     console.log(num);
//     let num1 = 200; //will not be able to call this variable outside of the function
// };

// foo(); // This calls the function that I wrote above

let anonFun = function() {  // this is an anonomous function.  It will not show up in the console log
        console.log("hello")
}


(function() {
    console.log("Hello");
})

// Arrow functions are short cut functions. A newer way to write a function.  
// (() => console.log(100))();

let foo = () => console.log(num);  //This is a quicker way to write the function foo in line 10

foo();

// Arrays (and sub arrays)
let arr = ["foo", 123, ["zar", "car"]]; 
console.log (arr[1]);

// Set item in array 
arr[1] = "barbar";


// Add item to the end of the array
arr.push("par"); 

console.log(arr); 

// Removing an item from the array (index, delete)
arr.splice (2, 1);
console.log(arr)

let newArr = ["cow", "turtle", "goat"];

// for loop
for (let item of newArr) {
    console.log(item);
}

// for loop with interartion (number)
for (let i in newArr) {
    console.log(i + " " + newArr[i]);
}

newArr.forEach((item, i) => console.log(i + " " + item));

// Objects (similar to Python dictionaries)

let obj1 = {
    name: "Jill",
    age: 85, 
    job: "Cactus Hunter", // this common is optional
};

// Access property
console.log(obj1.name);
// or
console.log(obj1["name"]); 

// Set value
obj1.job = "Barista";

// Loop through all properties
for (let key in obj1) {
    let value = obj1[key];
    console.log(`${key}: ${value}`);
}

// These next 2 lines say the same thing.  
// let str = "Hello " + key + " more text here " + foo;
// let str = `hello ${key} more text here ${foo}`;

// type of
let fall = 72;
console.log(typeof fall);

// Regular for loop
for (let i = 0; i < 10; i++) {
    console.log(i);
}

// Conditionals

let val = 80

if (val > 80) {
    console.log("good")
} else if (val>50) {
    console.log("okay")
} else {
    console.log("terrible")
}

let y = (val >= 80 ) ? console.log("good") : console.log("not good"); 

let newVar = document.getElementById('example') // refers to example in index.html line 11

newVar.innerHTML += "<h1> Hello world! <h1>"
