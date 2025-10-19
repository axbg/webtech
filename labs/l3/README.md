# Arrays

## Table of contents

1. [Arrays 101](#1-arrays-101)
   1. [Declaring an array](#11-declaring-an-array)
   2. [The length property](#12-the-length-property)
   3. [Data access](#13-data-access)
   4. [Data manipulation](#14-data-manipulation)
   5. [Iteration](#15-iteration)
   6. [Rest and spread operators](#16-rest-and-spread-operators)
   7. [Copying an array](#17-copying-an-array)

2. [Useful methods](#2-useful-methods)

3. [Exercises](#3-exercises)

4. [Hard(er) examples](#4-harder-examples)

## 1. Arrays 101

- The support for arrays integrated in JavaScript is very powerful, which is why they can be used with the same ease as primitive data types, but it is important to remember that **arrays are not primitives**, they are based on the Array object

- They can have a variable size that does not need to be specified at the time of declaration

- Being a weakly typed language, JavaScript allows mixing the type of data stored in an array
  - an array can contain, at the same time, the values "web", 1, 0.5, null, and {name: "John"}
  - JavaScript also provides a set of Typed Arrays that can be used for specialized operations
    - [Recommendation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Typed_arrays)

- As in other popular programming languages, the starting index of an array is 0

### 1.1 Declaring an array

- As with variables, declaring an array can be done with the let and const keywords

  ```javascript
  // declaring using let
  let firstArray = [1, 2, 3, 4];

  // declaring using const
  const secondArray = [1, 2, 3, 4];

  // what is the difference between let and const in this case?
  ```

### 1.2 The length property

- To access the current size of an array, we can use the length property

  ```javascript
  const arr = [1, 2, 3, 4];

  // will print 4
  console.log(arr);
  console.log(arr.length);

  // what will happen if we explicitly modify the size of an array?
  arr.length = 10;
  console.log(arr);
  console.log(arr.length);
  ```

### 1.3 Data access

- Values within an array can be accessed directly through indexes

  ```javascript
  const arr = [1, "web", { day: "Tuesday" }];

  // direct access
  console.log(arr[0]);
  console.log(arr[1]);

  // access can be done using another variable
  const idx = 2;
  console.log(arr[idx]);

  // also, an array can be destructured into its component elements
  const [first, second, third] = arr;
  console.log(first);
  console.log(second);
  console.log(third);
  ```

### 1.4 Data manipulation

- To add data, we can use the **push** method

  ```javascript
  const arr = [1, 2, 3, 4];

  arr.push(5);
  console.log(arr);
  ```

- To extract the last element from an array, we call the **pop** method, which can be used to "transform" the array into a stack

  ```javascript
  const arr = [1, 2, 3, 4];

  const lastElement = arr.pop();
  console.log(lastElement);
  console.log(arr);
  ```

  - if we want to extract the first object from the array, we can use the "shift" method

- For proper deletion of an element, we use the short variant of the **splice** method

  ```javascript
  const arr = [1, 2, 3, 4];

  // deleting an element from position 0
  const removedElement = arr.splice(0, 1);
  console.log(removedElement);
  console.log(arr);

  // alternative that returns an array with the element at position 0 deleted, without
  //  modifying the source array
  // arr.toSpliced(0, 1);
  ```

  - in a generic way, splice can be used to replace elements in an array in a certain position

  - JavaScript also makes use of the "delete" keyword to "remove" values within an array, but, unlike splice, it will not delete the position in the array, keeping an empty element

    ```javascript
    const arr = [1, "web", { day: "Tuesday" }];

    delete arr[2];

    console.log(arr);
    ```

- To initialize an array with a value we can use the **fill** method

  ```javascript
  const arr = [1];

  arr.length = 10;

  arr.fill(1);
  ```

- To concatenate two arrays we can use the **concat** method

  ```javascript
  const arr = [1, "web", { day: "Tuesday" }];
  const arr2 = [2, 3, 4];

  // concatenation will not be done in-place
  //  but will result in an array that will contain both arrays
  const combined = arr.concat(arr2);

  console.log(combined);
  ```

- To extract a substring from an array, the **slice** method can be used (not to be confused with the _splice_ method)

  ```javascript
  const arr = [1, 2, 3, 4];

  console.log(arr.slice(0, 2));
  ```

### 1.5 Iteration

- Array iteration can be done in several ways

  ```javascript
  const arr = [10, 11, 12, 13];

  // using a classic for loop
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }

  // using the for .. of syntax
  for (let element of arr) {
    console.log(element);
  }

  // using the for .. in syntax
  //      we observe that the indexes are iterated
  //      in JavaScript, an index is, in fact, a property
  for (let element in arr) {
    console.log(arr[element]);
  }

  // using the forEach syntax
  arr.forEach((element) => console.log(element));
  ```

- It can be observed that, unlike classic methods of iterating an array, the forEach method receives another method as a parameter, defined as an arrow function
  - This method passed as a parameter is called a **callback**, a very important concept in JavaScript
  - With the help of callbacks, we can implement dynamic behaviors and leverage powerful mechanisms such as asynchronous programming (as we will see in future labs)

### 1.6 Rest and spread operators

- Arrays benefit from the existence of two very powerful operators which, despite using the same notation (...), have opposite effects

- The rest operator allows passing a variable number of parameters to a function, encapsulating multiple individual variables in an array

  ```javascript
  // the rest operator can only be used as the last parameter in a function definition
  function checkRestOp(...params) {
    params.forEach((param) => console.log(param));
  }

  checkRestOp(1, 2, 3, 4, 5);
  ```

- The spread operator allows expanding an array into its component elements

  ```javascript
  function functionWith3Params(x, y, z) {
    console.log(x);
    console.log(y);
    console.log(z);
  }

  const arr = [1, 2, 3];
  functionWith3Params(...arr);
  ```

### 1.7 Copying an array

- All implicit mechanisms for copying an array create **a shallow copy**, including:
  - copying using the spread operator
  - using the Array.from method
  - using the slice method
  - using the concat method

    ```javascript
    const arr = [{ name: "John" }, { name: "Mary" }];

    const arrSpreadCopy = [...arr];
    const arrFromCopy = Array.from(arr);
    const arrSliceCopy = arr.slice();
    const arrConcatCopy = arr.concat([]);

    arr[1].name = "Marianne";

    console.log(arrSpreadCopy);
    console.log(arrFromCopy);
    console.log(arrSliceCopy);
    console.log(arrConcatCopy);
    ```

- To create a deep copy, the **JSON.parse** and **JSON.stringify** methods can be used, forcing JavaScript to recreate the object in a new memory area

  ```javascript
  const arr = [{ name: "John" }, { name: "Mary" }];

  const arrDeepCopy = JSON.parse(JSON.stringify(arr));

  arr[1].name = "Marianne";

  console.log(arr);
  console.log(arrDeepCopy);
  ```

  - we will learn more about JSON in the following labs, but you can read more about its structure here: [Recommendation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)

## 2. Useful methods

- Array type objects can use standard methods provided by the language to simplify access to the data stored inside them

- the **sort** method

  ```javascript
  const arr = [5, 3, 1, 3, 5];

  // implicit sorting, based on natural order
  arr.sort();
  console.log(arr);

  // the sort and toSorted methods allow passing a callback method
  //  that receives 2 parameters and returns the result of the comparison between them
  //      - -1 when parameter 1 < parameter 2
  //      -  0 when parameter 1 === parameter 2
  //      -  1 when parameter 1 > parameter 2

  // descending sorting
  arr.sort((param1, param2) => param2 - param1);
  console.log(arr);

  // alternative that returns a sorted array without modifying the source array
  // arr.toSorted();
  ```

- the **reverse** method

  ```javascript
  const arr = [1, 2, 3, 4, 5];

  arr.reverse();

  console.log(arr);

  // alternative that returns a reversed array without modifying the source array
  // arr.toReversed();
  ```

- the **includes** method

  ```javascript
  const arr = [1, 2, "john", 4, 5];

  // checks if an element is present in an array
  console.log(arr.includes(5));
  console.log(arr.includes(8));
  console.log(arr.includes("john"));
  ```

- the **indexOf** method

  ```javascript
  const arr = [1, 2, "john", 4, 5];

  // returns the first position where the element is found in the array
  console.log(arr.indexOf("john"));

  // if the element does not exist in the array, returns -1
  console.log(arr.indexOf("mary"));
  ```

- the **findIndex** method

  ```javascript
  const arr = [1, 2, "john", "john", 4, 5];

  // similar to the indexOf method
  //  can receive a callback as a parameter, which adds greater flexibility and support for more complex scenarios
  console.log(arr.findIndex((elem) => elem === "john"));

  // if the element does not exist in the array, returns -1
  console.log(arr.findIndex((elem) => elem === "mary"));
  ```

- the **find** method

  ```javascript
  const arr = [1, 2, { name: "john" }, "john", 4, 5];

  // similar to the indexOf and findIndex methods, but returns the value, not the index
  //  it is mainly used in complex scenarios, when the value is needed
  console.log(arr.find((elem) => elem.name === "john"));

  // if the element does not exist in the array, returns undefined
  console.log(arr.find((elem) => elem.name === "mary"));
  ```

- the **join** method

  ```javascript
  const arr = ["john", "marry", "george", "lucas"];

  // allows concatenating, in a string, all the values of an array
  //  separation will be done according to a separator received as a parameter
  console.log("All the names are: " + arr.join(", "));
  ```

- the **map** method

  ```javascript
  const arr = [
    { name: "john", age: 18 },
    { name: "jim", age: 16 },
    { name: "little george", age: 8 },
    { name: "matthew", age: 21 },
  ];

  // the map method iterates over each element in the array and returns another element
  //  it is a widely used method for parsing data with additional processing
  const mappedArray = arr.map((element) => {
    return { ...element, allowed: element.age >= 18 };
  });
  console.log(mappedArray);
  ```

- the **filter** method

  ```javascript
  const arr = [
    { name: "john", age: 18 },
    { name: "jim", age: 16 },
    { name: "little george", age: 8 },
    { name: "matthew", age: 21 },
  ];

  // the filter method iterates over each element in the array, checks a condition
  //      and returns only the elements respecting the condition
  const filteredArray = arr.filter((element) => element.age >= 18);
  console.log(filteredArray);
  ```

- the **reduce** method

  ```javascript
  const arr = [
    { name: "john", age: 18 },
    { name: "jim", age: 16 },
    { name: "little george", age: 8 },
    { name: "matthew", age: 21 },
  ];

  // the reduce method accesses each element in an array and executes a cumulative operation on it
  //  the result of the executed callback will be stored, at each step, in the accumulator variable
  //   which will retain its value as each step is executed
  // in addition to the callback, the reduce method receives another parameter that represents the initial value of the accumulator
  const totalAge = arr.reduce(
    (accumulator, element) => accumulator + element.age,
    0,
  );
  console.log(totalAge);

  // in the example above, the executed steps will be:
  //  accumulator = 0, 0 + 18
  //  accumulator = 18, 18 + 16
  //  accumulator = 34, 34 + 8
  //  accumulator = 42, 42 + 21
  //  accumulator = 63 - final value

  // we can say that "reduce" reduces an array to a single result

  // naturally, the reduce method parses elements from left to right
  //   for parsing from right to left we can use the reduceRight() method
  ```

- the **flat** method

  ```javascript
  const arr = [1, 2, [1, 2, 3], [[1], [2]], 10, ["johnny", ["web", "tech"]]];

  // the flat method "flattens" the arrays stored inside the main array
  console.log(arr.flat());

  // it is observed that the flat() method applies the transformation only to the first level of arrays
  //   for flattening multiple levels, it can be called successively
  console.log(arr.flat().flat());
  ```

- the **flatMap** method

  ```javascript
  const arr = [
    1,
    2,
    [1, 2, 3],
    [[1], [2]],
    10,
    ["johnny", []],
    ["web", "tech"],
  ];

  // the flatMap method flattens the arrays existing inside the main array by one level, after applying an initial mapping
  //   it is similar to calling, in chain, the map() and flat() methods
  console.log(arr.flatMap((x) => Array.isArray(x) ? x.concat(x) : x + 1));
  ```

- the **some** method

  ```javascript
  const arr = [
    { name: "john", age: 18 },
    { name: "jim", age: 16 },
    { name: "little george", age: 8 },
    { name: "matthew", age: 21 },
  ];

  // the some method checks if at least one element of an array meets a condition
  console.log(arr.some((element) => element.age > 20));
  console.log(arr.some((element) => element.name === "johnny"));
  ```

- the **every** method

  ```javascript
  const arr = [
    { name: "john", age: 18 },
    { name: "jim", age: 16 },
    { name: "little george", age: 8 },
    { name: "matthew", age: 21 },
  ];

  // the every method checks if all elements of an array meet a condition
  console.log(arr.every((element) => element.age > 18));
  console.log(arr.every((element) => element.age > 7));
  ```

## 3. Exercises

- [exercise 1](./practice/practice1.js)
- [exercise 2](./practice/practice2.js)
- [exercise 3](./practice/practice3.js)
- [exercise 4](./practice/practice4.js)
- [exercise 5](./practice/practice5.js)
- [exercise 6](./practice/practice6.js)
- [exercise 7](./practice/practice7.js)

## 4. Hard(er) examples

- [method chaining](./examples/method_chaining.js)
- [words filter](./examples/words_filter.js)
- [map method implementation](./examples/map.js)
- [string formatting using indexOf](./examples/format_1.js)
- [string formatting using split and map](./examples/format_2.js)
- [acrostic verification](./examples/acrostic.js)
- [dynamic filter](./examples/dynamic_filter.js)
