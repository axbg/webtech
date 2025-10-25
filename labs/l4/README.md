# Closures, classes & errors

## Table of contents

1. [Closures](#1-closures)
   1. [Scopes](#11-scopes)
   2. [The Context of a closure](#12-the-context-of-a-closure)

2. [Classes](#2-classes)
   1. [Declaring a class](#21-declaring-a-class)
   2. [The Constructor](#22-the-constructor)
   3. [Methods](#23-methods)
   4. [Properties](#24-properties)
   5. [Constructor functions and prototypes](#25-constructor-functions-and-prototypes)

3. [Errors](#3-errors-exceptions)

4. [Examples](#4-examples)

5. [Practice](#5-practice)

## 1. Closures

- A closure is the combination of a function and its lexical environment, giving the function the capability to "remember" and access variables from the scope in which it was created, even after that scope has finished its execution

- Technically, in JavaScript, all functions can be considered closures, but a function is typically called _a closure_ when it references variables from its outer context

- Closures are frequently used together with _higher-order functions_, which are functions that either take other functions as arguments or return functions, but they are different theoretical concepts

- To better understand the concept of closures, we need to recall another important concept: the **scope**

  ![Scopes](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Ft6hg6fofhirdsrvox089.png)

### 1.1 Scopes

- In JavaScript, there are 2 main types of scopes:
  - Global scope
    - encompasses the entire domain of a program
    - variables declared here are known as _global variables_
    - variables declared here can be accessed and modified from any area of the program throughout its execution

  - Local scope
    - variables declared here are known as _local variables_
    - variables declared here have a limited lifespan, being deallocated when the scope of their declaration is destroyed
    - branches into two other subtypes:
      - Function scope
        - defined when a function is declared
        - _var_ keyword can be used to declare variables at function scope
        - variables declared at function scope are accessible anywhere within the function

        ```javascript
        function functionScope() {
          if (true) {
            var x = 10;
          }

          // will print 10
          console.log(x);
        }
        ```

      - Block scope
        - defined when a block of statements is declared (if, while, for, etc)
        - _let_ and _const_ keywords can be used to declare variables at block scope
        - variables declared at block scope can be accessed only inside that block

        ```javascript
        function blockScope() {
          if (true) {
            const x = 10;
          }

          // will throw an error
          console.log(x);
        }
        ```

- **Quick question**: what will the following snippet print?

```javascript
for (var x = 0; x < 3; x++);
for (let y = 0; y < 3; y++);

console.log(x);
console.log(y);
```

- Regardless of the block type, an inner block can access all variables declared in its outer blocks through a mechanism called **scope chain**

```javascript
let x = 10;

function a() {
  return function b() {
    x = 5;

    return function c() {
      console.log(x);
    }
  }
}

// both will print 5
a()()();
console.log(x);
```

- JavaScript will follow the scope chain when a variable is not declared in the current block, trying to find a declaration of that variable in the parent scope and so on

- If a variable already defined in an outer scope is redeclared in the current scope, it will **shadow** the original variable by creating a new one, and making the previous one unreachable in the current scope

```javascript
let x = 10;

function a() {
  return function b() {
    let x = 5;

    return function c() {
      console.log(x);
    }
  }
}

// will print 5
a()()();
// will print 10
console.log(x);
```

- An analogy extracted from [this article](https://blog.codeanalogies.com/2017/11/22/how-javascript-variable-scoping-is-just-like-multiple-levels-of-government/) compares scopes with laws, as they are often defined at multiple levels

```javascript
const humanRights1 = "All human beings are free and equal";
const humanRights2 = "No discrimination";

// human rights are also applicable in Europe
function europe(country) {
  const europeanLaw = "General Data Protection Regulation (GDPR)";

  // human rights and European laws are also applicable in Romania, together with other local laws and regulations
  if (country === "Romania") {
    const publicHoliday1 = "1 Decembrie";
  }
}
```

### 1.2 The Context of a Closure

- Based on how the scope chain works, a closure will be able to access:
  - variables defined at the level of its own function scope
  - variables from all its outer blocks
  - global variables

  ```javascript
  const a = 1;

  function outerFunction(x) {
    return function middleFunction(y) {
      return function innerFunction(z) {
        // can access global a
        // x from outerFunction
        // y from middleFunction
        // z from its own definition
        console.log(a + x + y + z);
      };
    };
  }

  const mdFunction = outerFunction(1);
  const innFunction = mdFunction(1);

  // will print 4
  innFunction(1);
  ```

- A closure will be able to access everything available in its context, being a very powerful mechanism for data encapsulation

```javascript
function init() {
  let name = "Mozilla";

  function displayName() {
    // the function that forms the closure
    console.log(name);
  }

  displayName();
}

init();
```

- Recommendation: [an article containing an analogy for a better understanding of closures](https://blog.codeanalogies.com/2018/10/19/javascript-closures-explained-by-mailing-a-package/)
- Recommendation: [closures in 100 seconds](https://www.youtube.com/watch?v=vKJpN5FAeF4)

## 2. Classes

- In JavaScript, as in any other object-oriented programming language, a class represents a template that encapsulates properties and behaviors used for instantiating multiple similar objects

- Unlike classic OOP languages, JavaScript is prototype-based, which is why classes, a relatively recent addition, use prototypes in their implementation, being a form of syntactic sugar

### 2.1 Declaring a Class

- Class declaration can take multiple forms, all having the same end result

```javascript
// normal class declaration
class Animal {
  constructor(name, species) {
    this.name = name;
    this.species = species;
  }
}

// class expression - the class is anonymous but assigned to a variable
const DomesticAnimal = class {
  constructor(species) {
    this.species = species;
  }
};

// class expression - the class has its own name
const MyAnimalClass = class Animal {
  constructor(name, species) {
    this.name = name;
    this.species = species;
  }
};

// instantiating the corresponding objects
const firstAnimal = new Animal("Bobby", "dog");
const secondAnimal = new DomesticAnimal("fish");
const thirdAnimal = new MyAnimalClass("Zoro", "cat");
```

### 2.2 The Constructor

- The constructor is a special method of a class used for creating and initializing an object

- Each class can have only one constructor, defined through a method with the same name
  - If multiple constructors are defined, an error will be thrown

- The **super** keyword is used to call the constructor of the parent class when we define an inheritance through the **extends** keyword

```javascript
class Human {
  age;

  constructor(age) {
    this.age = age;
  }
}

class Person extends Human {
  constructor(age, name) {
    super(age);

    // underscore prefix is a convention for "private" properties before the # notation was introduced
    this._name = name;
  }

  // getter
  get name() {
    return this._name;
  }

  // setter
  set name(newName) {
    this._name = newName;
  }

  greet() {
    console.log("Hello, " + this.name + "!");
  }
}

const firstPerson = new Person(20, "Mary");
firstPerson.greet(); // Hello, Mary!
// using setter
firstPerson.name = "John";
// using getter
console.log(firstPerson.name);
console.log(firstPerson.age);
```

### 2.3 Methods

- In JavaScript, a method defined in a class will be implemented through a function attached to the parent prototype

- From the perspective of class modeling and implementation, there are many similarities with other studied languages (Java, C#), as we can observe in the previous example the implementation of getter/setter type methods for accessing and modifying a property

- Besides methods associated with an instance, we can define static methods by using the _static_ keyword, which will be associated with the class itself, not with an instance

```javascript
class Person {
  name;
  static age = 20;

  static yawn() {
    // static methods cannot access instance properties (this.name is not available here)
    // but can access static properties
    console.log(`Yaaaaaaaaawn for ${Person.age} years`);
  }
}

Person.yawn();
```

### 2.4 Properties

- Properties can be defined explicitly in the class or directly in the constructor and can be public or private (preceded by #)

```javascript
class Person {
  name;
  // private property, cannot be accessed from outside the class
  // except through a getter, and updated only through a setter
  #location;

  constructor(name, age, location) {
    this.name = name;
    this.#location = location;
    // properties can be declared here as well
    this.age = age;
  }

  greet() {
    console.log(`Hello, I'm ${this.name} and I'm ${this.age} years old!`);
  }
}
```

- As with methods, a class can declare one or more static properties, associated with the class and not the instances

```javascript
class MathUtils {
  // static attribute
  static PI = 3.14159265359;

  // static method
  static calculateCircleArea(radius) {
    return MathUtils.PI * radius ** 2;
  }
}

console.log(`The value of PI is: ${MathUtils.PI}`);

const radius = 5;
const area = MathUtils.calculateCircleArea(radius);
console.log(`The area of a circle with radius ${radius} is: ${area}`);
```

### 2.5 Constructor Functions and Prototypes

- Before the introduction of classes in the language, OOP behavior could be defined using constructor functions, which allow the declaration of an object type that can be modified later (both in terms of properties and methods)

```javascript
// constructor function
function Plant(species, region) {
  this.species = species;
  this.region = region;
}

// adding methods using the prototype
Plant.prototype.getDescription = function () {
  console.log(
    `This plant belongs to the species ${this.species} and can be found in the region of ${this.region}`,
  );
};

const cactus = new Plant("Cactaceae", "Americas");

// what would an equivalent class look like from a functionality perspective?
```

- Constructor functions and classes produce the same result from a structural perspective, both objects being derived from the base Object class

## 3. Errors (Exceptions)

- Errors, similar to exceptions in languages like Java and C#, represent an object associated with exceptional events that can occur during program execution

- A complete list of predefined errors in JavaScript can be found [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors)

- Errors can be generated automatically by the interpreter when executing an erroneous instruction, or programmatically, by using the **throw** keyword

```javascript
function throwIfZero(n) {
  if (n === 0) {
    throw new TypeError("The number should not be 0");
  }

  return console.log(n * n);
}
```

- In addition to predefined error types, custom errors can be created by extending the base _Error_ class, which could be done to establish application-level restrictions

```javascript
class MyCustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "MyCustomError";
  }
}

function divide(a, b) {
  if (b === 0) {
    throw new MyCustomError("Division by zero is not allowed.");
  }
  return a / b;
}
```

- An equally important mechanism is the error handling mechanism, known as the _try/catch/finally_ mechanism

```javascript
const greet = (name) => {
  if (typeof name === "string") {
    console.log(`Hello, ${name}`);
  } else {
    throw new TypeError("The name should be a string");
  }
};

try {
  // statements that may trigger an error
  greet();
} catch (e) {
  // statements called when an error is intercepted
  console.log(e);
} finally {
  // statements called regardless of the function's result
}
```

- To handle multiple error types differently, the catch block can be defined as follows:
```javascript
catch(error) {
  if (e instanceof RangeError) {
    // execute a specific type of instructions for RangeError type errors
  } else if (e instanceof TypeError) {
    // execute a specific type of instructions for TypeError type errors
  } else {
    // otherwise throw the exception further
    throw e;
  }
}
```

## 4. Examples

- 1. [Closures](./examples/closure.js)
- 2. [Class](./examples/class.js)
  - 1. [Extra class](./examples/extra/class_2.js)
  - 2. [Extra class 2](./examples/extra/class_3.js)
- 3. [Class constructor function](./examples/class_constructor_function.js)
- 4. [Error](./examples/error.js)
  - 1. [Extra Error](./examples/extra/error_2.js)

## 5. Practice

- 1. [Closures](./practice/closure.js)
- 2. [Class](./practice/class.js)
- 3. [Error](./practice/error.js)
