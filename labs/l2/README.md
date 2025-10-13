# Web & JavaScript 101

## Table of contents

1. [Web](#1-web)
   1. [What is the Web?](#11-what-is-the-web)
   2. [Internet vs Web](#12-internet-vs-web)
   3. [File sharing and storing on the Web](#13-file-sharing-and-storing-on-the-web)
   4. [HTTP](#14-http)
   5. [HTML](#15-html)
   6. [CSS](#16-css)

2. [JavaScript](#2-javascript)
   1. [Data types](#21-data-types)
   2. [Variables](#22-variables)
   3. [Functions](#23-functions)
   4. [Prototypes and classes](#24-prototypes-and-classes)
   5. [Control statements](#25-control-statements)

## 1. Web

### 1.1 What is the Web?

- The World Wide Web (WWW) or, briefly, the Web is a network of interconnected resources linked together with the help of hyperlinks

- The Web was created in 1989 by Sir Tim Berners-Lee at CERN to connect researchers from all over the world, allowing them to share the research papers stored on their institutes' computers in a fast and efficient way

### 1.2 Internet vs Web

- Before talking about the Web, we need, first, to discuss the Internet and understand the distinction between the two

- The Internet is a global network of interconnected computers that allows the fast transmission of data, regardless of the distance between them

- In terms of size, the Web is a subdivision of the Internet, the latter having a lot of other similar subsystems, such as e-mail, file sharing, or online gaming

### 1.3 File sharing and storing on the Web

- Each resource available on the Web is stored on a computer called a host, which can be accessed by any client through a hyperlink

- A hyperlink contains a standardized address called Uniform Resource Locator (URL) that uniquely identifies a resource

- The structure of a URL is:

```
  [protocol]://[domain][path/to/a/resource?parameter1=value1&parameter2=value2]
  example:
  https://wikipedia.org/wiki/World_Wide_Web
```

- **The protocol** represents a set of rules known by both the client and the host, allowing them to communicate
  - The most important protocol for the Web is the HyperText Transfer Protocol (HTTP)
    - HyperText Transfer Protocol Secure (HTTPS) is an extension of HTTP that creates a secure transmission channel between the client and the host

- **The domain** represents the unique identifier of a host
  - To ensure the uniqueness of each domain, a small group of entities, led by The Internet Corporation for Assigned Names and Numbers (ICANN), controls their assignment
  - To prevent the need to obtain a separate domain for each group of distinct resources owned by the same host, each domain can expose second-level domains called subdomains

  ```
    https://mail.google.com
    https://drive.google.com
  ```

- **The path** to a resource represents the unique identifier of that resource within a domain or a subdomain

- A URL can also contain parameters, specified in a key=value format and using the & symbol as a separator

### 1.4 HTTP

- **HTTP** is a client-server protocol that is characterized by an exchange of messages initiated by the client (request) to which the host (also known as the server) answers (response)

- Most of the time on the Web, the client is a **browser**

- Besides the URL, HTTP defines methods that describe the type of action invoked by the client

- The most used HTTP methods are:
  - GET - requests data from the server
  - POST - requests the addition of data on the server
  - PUT - requests the update of some data stored on the server
  - DELETE - requests the removal of some data stored on the server
  - ([all the HTTP methods](https://www.w3schools.com/tags/ref_httpmethods.asp))

- After receiving a request, the server decides, depending on the type of action, if the request can be successfully handled, associating a **status** with the response

- HTTP defines 5 groups of statuses, each describing a different result type:
  - 100 - informational
  - 200 - success
  - 300 - redirect
  - 400 - client error
  - 500 - server error
  - ([all the HTTP statuses](https://http.cat/))

- Usually, when a resource is requested on the Web, it's not just a random document, but a file with a special structure that can be interpreted by the browser and transformed into a graphical representation

- This type of resource is known as a web page, and it's defined using the HyperText Markup Language (HTML)

### 1.5 HTML

- The HyperText Markup Language (HTML) is a language used to describe the structure of a web page through a series of special tags

```html
<html>
  <head>
    <title>Webtech 2025</title>
  </head>
  <body>
    <p>Hello, Web!</p>
  </body>
</html>
```

- Most tags could have child elements that should be defined between the open and close notations of a parent tag

```html
<div>
  <!-- parent element -->
  <p>child element</p>
</div>
```

- Web pages are organized as a tree, and the parent node is always defined using the \<html> tag

- Although HTML can be used to describe the structure of a web page, it cannot define complex graphical aspects such as coloring or special positioning of some elements; thus, CSS was invented

### 1.6 CSS

- Cascading Style Sheets (CSS) is a style sheet language used for specifying the styling of an HTML document

- CSS can be used for:
  - coloring
  - defining complex layouts
  - usage of different fonts
  - responsiveness
    - web pages that adapt their style based on the screen size
  - simple animations and transitions

- CSS can be directly written in an HTML file

```html
<html>
  <head>
    <title>Webtech 2025</title>
    <style>
      p {
        color: red;
      }
    </style>
  </head>
  <body>
    <p>Hello, Web!</p>
  </body>
</html>
```

- For a better separation of concerns, CSS can be extracted into a separate file and imported back into the HTML file

```css
/* styles.css */
p {
  color: red;
}
```

```html
<html>
  <head>
    <title>Webtech 2025</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <p>Hello, Web!</p>
  </body>
</html>
```

- To identify an element defined by an HTML page, CSS uses a large number of selection methods, the most important of them being:
  - element selectors

  ```css
  p {
    color: red;
  }
  ```

  - class-based selectors

  ```css
  .paragraph {
    color: red;
  }
  ```

  ```html
  <p class="paragraph">Hello web</p>
  ```

  - identifier-based selection

  ```css
  #first-paragraph {
    color: red;
  }
  ```

  ```html
  <p id="first-paragraph">Hello web</p>
  ```

- Although very useful for their specific purposes, HTML and CSS are not traditional programming languages and cannot compute dynamic values or implement complex behaviors

- In order to make the Web more dynamic, JavaScript, a full-fledged programming language, was created, and it quickly became one of the most important languages of all time

## 2. JavaScript

- JavaScript, invented in 1995 by Brendan Eich, is a high-level, object-oriented interpreted language

- In 2025, [98.9%](https://w3techs.com/technologies/details/cp-javascript) of all websites use JavaScript

- JavaScript is a very powerful programming language used on the client-side, as well as on the server-side

### 2.1 Data types

- JavaScript defines 7 primitive data types
  - Number - integer and decimal numbers
  - String - array of characters
  - Boolean - binary true/false value
  - undefined - default value of declared variables that are not initialized
  - null - represents the absence of a value
  - Symbol - unique and immutable value
  - BigInt - very big integer
- Recommendation: [the difference between undefined and null values](https://www.geeksforgeeks.org/undefined-vs-null-in-javascript/)

- Besides primitive types, JavaScript uses references to track all the other variables, such as:
  - Objects
  - Arrays
  - Functions
  - (basically everything else)

- JavaScript defines a special classification of values that can be either _truthy_ or _falsy_
  - Recommendation: [truthy and falsy values](https://www.30secondsofcode.org/js/s/truthy-falsy-values/)

### 2.2 Variables

- Variables can be declared using 3 different keywords:
  - let
    - defines a variable scoped to an execution block
    - the variable cannot be redeclared in the same execution block

    ```javascript
    let y = "y";
    ```

  - const
    - defines a constant scoped to an execution block
    - requires initialization during declaration
    - cannot be redeclared in the same execution block

    ```javascript
    const x = "x";
    ```

  - var
    - defines a variable scoped to a function
    - can be redeclared
    - not recommended
    ```javascript
    var z = "z";
    ```

- JavaScript defines a special mechanism called **hoisting** that moves the declaration of all variables and functions to the beginning of the execution block/function that they belong to (or at the beginning of the global block if a variable is declared outside of a function)

```javascript
console.log(x); // prints undefined

var x;
```

- Recommendation: [more about hoisting](https://www.geeksforgeeks.org/javascript-hoisting/)

- The variables declared with let or const are targeted by hoisting, but their values are not initialized automatically as undefined, so an error will be thrown

```javascript
console.log(x); // throws a ReferenceError

let x = 10;
```

- Objects can be declared in multiple ways, the easiest approach being the usage of literals

```javascript
const myCar = {
  color: "red",
  year: 2025,
  brand: "Toyota",
};

console.log(myCar.color);
console.log(myCar["color"]); // prints the same value
```

### 2.3 Functions

- The declaration is done using the function keyword

```javascript
function plus(a, b) {
  return a + b;
}

console.log(plus(5, 6));
```

- Functions are first-class citizens, so they can be stored as variables and passed around as parameters to other functions, resembling C pointers to functions

```javascript
const operation = function (param1, param2, op) {
  return op(param1, param2);
};

const plus = function (a, b) {
  return a + b;
};

console.log(operation(5, 6, plus));
```

- In addition to that, a function can be declared using the arrow function syntax, the main difference when compared to a regular function being that, if we declare an arrow function in a class, it will not receive a reference to the current object (**this**)

```javascript
const plus = (a, b) => {
  return a + b;
};

console.log(plus(5, 6));
```

- Functions can also be declared during the initialization of an object

```javascript
const myCar = {
  color: "red",
  year: 2025,
  brand: "Toyota",
  doSomething: (a) => {
    console.log("do " + a);
  },
};

console.log(myCar.doSomething("javascript"));
```

### 2.4 Prototypes and classes

- JavaScript is an object-oriented language that defines the **prototype** object as the main inheritance mechanism, as opposed to classic object-oriented languages like Java that build upon the concept of **class**

- The prototype of an object represents a parent object used to extend the properties and methods of the current object

```javascript
// Constructor function used to create an object of type Person
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Extending the Person prototype with a function
Person.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
};

// Creating an instance
const person1 = new Person("Alice", 30);
const person2 = new Person("Bob", 25);

person1.greet();
person2.greet();
```

- The prototype of an object can be accessed directly using the **proto** property, but it's not recommended to do that

```javascript
const car = {
  color: "red",
};

const volkswagen = {
  engine: "v8",
};

volkswagen._proto_ = car;
console.log(volkswagen.color);
```

- In newer JavaScript versions, support for a formal definition of classes was added, but it's a form of [_syntactic sugar_](https://en.wikipedia.org/wiki/Syntactic_sugar#:~:text=In%20computer%20science%2C%20syntactic%20sugar,style%20that%20some%20may%20prefer.) that uses prototypes under the hood

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`,
    );
  }
}

const pers = new Person("John", 25);
pers.greet();
```

### 2.5 Control statements

- Control statements in JavaScript are very similar to those in other high-level languages

- Branching statements

```javascript
const x = 5;

if (x < 5) {
  console.log("lower than 5");
  // in JavaScript, comparisons can be done using both == and ====
  // look up the difference between them
  // which version do you think is recommended most of the time?
} else if (x === 5) {
  console.log("it's a 5!");
} else {
  console.log("it's bigger than 5");
}

switch (x) {
  case 5:
    console.log("It's a 5!");
    break;
  default:
    console.log("It's other value..");
}

const y = x === 5 ? "it's 5" : "it's not 5";
console.log(y);
```

- Recommendation: [secondary branching statements](https://dev.to/saran_chakravarthi/javascript-demystified-short-circuiting-nullish-coalescing-and-optional-chaining-1e4n)

- Repetitive statements

```javascript
let x = 0;

// do .. while
while (x < 5) {
  console.log("still lower than 5");
  x++;
}

for (let i = 0; i < 5; i++) {
  console.log("Increasing to 5");
}

// initialization of an array, we'll discuss more about it in the next lab
const arr = [1, 2, 3, 4];
for (const nm of arr) {
  console.log(nm);
}

// iterating the properties of an object
const obj = { name: "John", age: 23 };
for (const key in obj) {
  console.log(`${key}: ${obj[key]}`);
}
```
