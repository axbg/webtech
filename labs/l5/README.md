# Asynchronous Programming: callback, Promise, async/await

## Table of contents

1. [Synchronous and Asynchronous Programming](#1-synchronous-and-asynchronous-programming)
   1. [Synchronous Programming](#11-synchronous-programming)
   2. [Asynchronous Programming](#12-asynchronous-programming)

2. [Callbacks](#2-callbacks)
   1. [Callback hell](#21-callback-hell)

3. [Promises](#3-promises)
   1. [Creating a promise](#31-creating-a-promise)
   2. [Promise states](#32-promise-states)
   3. [Chaining](#33-chaining)
   4. [Error handling](#34-error-handling)
   5. [Promise class methods](#35-promise-class-methods)

4. [async/await](#4-asyncawait)

5. [Examples](#5-examples)

6. [Exercises](#6-exercises)

## 1. Synchronous and Asynchronous Programming

- Synchronous programming and asynchronous programming are two different paradigms for managing the execution flow

- Despite using different concepts, most modern languages provide mechanisms that implement both programming styles, each having its own advantages and disadvantages

### 1.1 Synchronous Programming

- Synchronous programming represents the default programming style for most programming languages, including JavaScript, where a program's instructions are executed sequentially

- We say that synchronous programming is blocking because only one instruction is executed at a time, and the following instruction will wait for it to complete before it can be executed as well (causing the same _waiting_ behavior for the next instruction and so on)

  ![Synchronous execution of instructions](https://www.freecodecamp.org/news/content/images/size/w2400/2023/01/image-244.png)

- The main advantage is the simplicity, with synchronous code being executed _top-to-bottom_, in an order that is very easy to follow

  ```javascript
  function simpleFunction(x, y) {
    const z = x + y;
    console.log(z);
  }

  function secondFunction() {
    console.log("Hello, Web!");
  }

  // instructions are executed one after another
  console.log("Hello");
  simpleFunction();
  secondFunction();
  ```

- However, the main disadvantage is the blocking nature of synchronous operations, which doesn't allow a program to execute multiple instructions when a complex, time-consuming instruction is being executed

  ```javascript
  function performHeavyOperation() {
    let x = 0;
    for (let i = 0; i < 10000000000; i++) {
      x += i;
    }
  }

  console.log("Starting something heavy");
  performHeavyOperation();
  console.log("This will take a while...");
  ```

- This disadvantage is even more relevant for JavaScript, which was created to integrate dynamic elements into web pages
  - If we execute the previous example in a browser console, we'll notice that, throughout the entire execution of the _performHeavyOperation_ method, the page no longer responds to generated events, because JavaScript, a fundamentally single-threaded language, will execute instructions in the order they were invoked

- For a single-threaded language like JavaScript, blocking the main thread cannot be avoided when an intensive instruction is being executed, but generally, in interactive applications, intensive operations are avoided, being replaced instead with input/output (I/O) operations which, in a synchronous approach, produce the same blocking effect

- For this reason, JavaScript offers native support for multiple _asynchronous programming_ techniques

### 1.2 Asynchronous Programming

- Asynchronous programming is an advanced programming style that allows a runtime to execute multiple instructions at a time, without waiting for previous instructions to complete

  ![Asynchronous programming](./assets/async-execution.png)

- In JavaScript, most asynchronous operations are based on input/output events, both on the back-end and front-end
  - calling an external service
  - executing a query in a database
  - handling events triggered by a user's interaction with a web page
  - loading or downloading a file

- Asynchronous programming makes use of events as the primary notification mechanism, allowing other instructions to be executed only when a long-running operation has completed, without the main thread having actively waited for its completion

  ![Passive event handling](https://accedia.com/wp-content/uploads/old/async-programming.png)

- One of the clearest illustrations of the differences between synchronous and asynchronous programming is [the chef example](https://www.youtube.com/shorts/v6sI1tidSw8)

- The main advantages of asynchronous programming are increased responsiveness, reduced waiting times, and better resource management, with JavaScript being extremely fast in I/O context, despite using a single thread

- The main disadvantage is the added complexity, as the code no longer has a sequential, easy-to-follow execution flow

  ```javascript
  console.log("Start of script");

  setTimeout(() => {
    console.log("First timeout completed");
  }, 1000);

  console.log("End of script");
  ```

- In the previous example, calling the _setTimeout_ method simulates executing a long-running operation asynchronously, such as calling a web service or downloading an image
  - We notice that the program's flow is not linear, which, in a context with many instructions and data structures, can increase the code's complexity by a large margin

- To asynchronously manage all events generated during a program's execution, JavaScript uses an [event loop](https://i.ibb.co/nbQc6sk/Javascript-event-loop.png) that forms the basis of the entire runtime
  - [Recommendation: Understanding at a deep level how JavaScript executes asynchronous instructions](https://www.youtube.com/watch?v=8aGhZQkoFbQ)

- In simple terms, we can say that when interacting with an external agent, JavaScript will provide to the event loop a method to notify the remaining instructions to run, thus avoiding active progress monitoring (without waiting), which allows the main thread to execute other instructions

  ![Events in asynchronous programming](https://miro.medium.com/v2/resize:fit:587/1*Y41dOkntUbR3I4UCJBx9Xg.png)

- Using this mechanism, JavaScript, and by extension, systems that use asynchronous programming techniques, can exceed the performance of traditional systems, especially in intensive I/O contexts
  ![Performance of asynchronous systems](https://miro.medium.com/v2/format:webp/1*1fld2hKmtya0d3h1vr0D0A.png)

- This mechanism of executing a group of instructions at an undefined future moment, upon completion of a long-running operation, was initially implemented in JavaScript using **callbacks**

## 2. Callbacks

- A callback is a function passed as a parameter to another function, with the purpose of being executed at some point inside that function

- We first encountered the concept of a callback when we discussed the utility methods of [arrays](/labs/l3/README.md#15-iteration)

  ```javascript
  const arr = [
    { name: "john", age: 18 },
    { name: "jim", age: 16 },
    { name: "little george", age: 8 },
    { name: "matthew", age: 21 },
  ];

  // the filter method receives a callback as a parameter
  const filteredArray = arr.filter((element) => element.age >= 18);
  console.log(filteredArray);
  ```

- In the context of asynchronous programming, a callback can be used like this:

  ```javascript
  function fetchData(callback) {
    setTimeout(() => {
      const data = { name: "John", age: 18 };
      callback(data);
    }, 2000);
  }

  // the callback will be called when the non-blocking method finishes
  fetchData(function (data) {
    console.log("Data was fetched!");
    console.log(data);
  });

  console.log("Data is being fetched...");
  ```

### 2.1 Callback hell

- Callbacks are a very powerful and useful feature, representing the first mechanism for managing asynchronicity in JavaScript

- However, in a real application that uses a large number of asynchronous operations, using callbacks can affect the readability of the source code

  ```javascript
  function doStep1(init, callback) {
    const result = init + 1;
    callback(result);
  }

  function doStep2(init, callback) {
    const result = init + 2;
    callback(result);
  }

  function doStep3(init, callback) {
    const result = init + 3;
    callback(result);
  }

  function doOperation() {
    doStep1(0, (result1) => {
      doStep2(result1, (result2) => {
        doStep3(result2, (result3) => {
          console.log(`result: ${result3}`);
        });
      });
    });
  }

  doOperation();
  ```

- In the previous example, despite using only 3 callbacks, the code becomes hard to read, making it difficult to determine the execution flow

- This situation is called _callback hell_ and can lead to bugs that are very hard to detect, which is why the excessive use of callbacks is not recommended
  - [extreme example of callback hell](./examples/callback-hell.js)

- To solve this problem, in 2015, a new model was introduced, fundamental for managing asynchronous operations in modern applications: the **Promise**

## 3. Promises

- A promise represents an object that, at an undetermined moment in the future, will contain the positive or negative result of an asynchronous operation

- Similar to a callback, which is called at the end of an asynchronous action, a promise's value is not known at the moment of definition, but will be determined, at some point, following the completion of an asynchronous operation

### 3.1 Creating a promise

- A promise can be created using the specific constructor

  ```javascript
  const promise = new Promise((resolve, reject) => {
    // implementing a Promise
    const rnd = Math.random() * 10;

    if (rnd % 2 === 0) {
      resolve(rnd);
    } else {
      reject(rnd);
    }
  });
  ```

- The Promise object's constructor will receive as parameter a function, called the executor function, which will always have two parameters:
  - resolve - a predefined method that must be called when the operation within the promise is completed
  - reject - a predefined method that must be called when an error occurs that makes it impossible to complete the executed operation

### 3.2 Promise states

- Because it is an object used for modeling asynchronous operations, a promise's result is not known at the moment of definition, being, at any given moment, in one of the following states:
  - pending - the initial state, the promise's result has not yet been determined
  - fulfilled - final state, the operation completed successfully
  - rejected - final state, the operation failed

- We consider a promise to be _settled_ when it has reached one of the two final states: fulfilled or rejected

- Besides _state_, a promise contains an additional property that stores the concrete result of the executed operation:
  - in pending - a generic result of type undefined
  - in fulfilled - an object containing the value returned by the promise
  - in rejected - an error-type object

- To manage the program's behavior when a promise is completed, we can use the _then_, _catch_ and _finally_ methods
  ```javascript
  promise
    .then((result) => {
      // will be executed when the promise is resolved
      console.log(result);
    })
    .catch((error) => {
      // will be executed when the promise is rejected
      console.log(error);
    })
    .finally(() => {
      // optional finally method that works identically to the try/catch/finally mechanism
    });
  ```

### 3.3 Chaining

- The _then_, _catch_ and _finally_ methods will wrap any returned result that is not a promise into a new promise, thus allowing the chaining of multiple promises

- Through sequential chaining, situations similar to those that would lead to callback hell are avoided

  ![Promise chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/promises.png)

```javascript
// simulating data retrieval from a remote server
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = Math.random();
      resolve(data);
    }, 1000);
  });
}

// chaining multiple promises
fetchData()
  .then((data) => {
    console.log("Step 1: Data fetched:", data);
    // the result will be automatically wrapped in a Promise
    return data * 2; // data processing
  })
  .then((processedData) => {
    console.log("Step 2: Data processed:", processedData);
    return processedData + 3; // additional processing
  })
  .then((finalResult) => {
    console.log("Step 3: Final result:", finalResult);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

### 3.4 Error handling

- When a promise within a chain is rejected, the catch block will be used regardless of the number of then blocks defined before

  ```javascript
  // simulating a function that rejects a promise
  function simulateError() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("Something went wrong");
      }, 1000);
    });
  }

  // using the catch method
  simulateError()
    .then((result) => {
      console.log("This will not be executed");
    })
    .then((result) => {
      console.log("This will not be executed");
    })
    .then((result) => {
      console.log("This will not be executed");
    })
    .catch((error) => {
      console.error("This will be printed:", error);
    });
  ```

- Similarly, if any error is thrown inside a promise, it will be automatically wrapped in another promise that will be rejected and will be handled by the catch block

  ```javascript
  function fetchData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("The promise finished");
      }, 1000);
    });
  }

  // using the catch method
  fetchData()
    .then((result) => {
      console.log(result);
      console.log("This will be executed");
    })
    .then((result) => {
      throw new Error("Something bad happened");
    })
    .then((result) => {
      console.log("This will not be executed");
    })
    .catch((error) => {
      console.error("This will be printed:", error);
    });
  ```

### 3.5 Promise class methods

- Like the Array class, the Promise class defines a series of static methods that extend the functionalities of the language

- **Promise.resolve() and Promise.reject()**
  - two similar methods that allow automatic creation of a _settled_ promise, without using the class constructor

    ```javascript
    const resolvedPromise = Promise.resolve("Finishes with success");

    resolvedPromise.then((result) => console.log(result));

    const rejectedPromise = Promise.reject("Didn't work this time");
    rejectedPromise
      .then((result) => console.log(result))
      .catch((error) => console.log("Error: " + error));
    ```

- **Promise.all()**
  - Wraps multiple promises into a new promise that will be resolved when all the promises received as parameters are resolved
  - If at least one of the promises received as parameter is rejected, the entire generated promise will be rejected with that error
  - It is a useful method for aggregating and synchronizing multiple promises

    ```javascript
    // aggregating data from different sources
    function fetchArticleTitle(url) {
      // note the use of the fetch method which allows calling web services and interpreting received responses
      // for a detailed example, consult the fetch.js file in the examples directory
      return fetch(url)
        .then((response) => response.json())
        .then((data) => data.title);
    }

    const urls = [
      "https://jsonplaceholder.typicode.com/posts/1",
      "https://jsonplaceholder.typicode.com/posts/2",
      "https://jsonplaceholder.typicode.com/posts/3",
    ];

    const requests = urls.map((url) => fetchArticleTitle(url));

    Promise.all(requests)
      .then((titles) => {
        console.log("Article Titles:", titles);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
    ```

- **Promise.allSettled()**
  - Like Promise.all(), it wraps an array of promises received as a parameter
  - Unlike it, Promise.allSettled will always return a resolved promise when all the promises received as parameters become settled (regardless of their final state)
  - The content of the resolved promise is represented by an array of settled promises that maintains the order specified in the input

    ```javascript
    const promise1 = Promise.resolve(3);
    const promise2 = new Promise((resolve, reject) => setTimeout(reject, 2000));

    const promises = [promise1, promise2];

    Promise.allSettled(promises).then((results) =>
      results.forEach((result) => console.log(result.status)),
    );
    ```

- The Promise class includes two additional methods which are not used as frequently: _race_ and _any_; you can read more about them [here](https://javascript.plainenglish.io/promise-in-javascript-with-all-the-methods-b7357196a57e)

- Although they represent a considerable improvement over callbacks, promises continue to increase the level of complexity, with each asynchronous operation requiring additional instructions

- For this reason, in 2017, the _async_ and _await_ keywords were introduced in JavaScript

## 4. async/await

- The async/await keyword pair offers programmers a way to write asynchronous code in a format that doesn't deviate very much from the way synchronous code is written

- Just as promises are built on the foundations provided by callbacks, async/await is based on promises and is used together with them
  - In addition to Promises, async/await also uses the concept of _generator_ functions; you can read more about it [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)

- Unlike promises, however, they are easier to use, increasing code readability when asynchronous operations are involved

  ```javascript
  // long-running asynchronous operation
  function delay(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  // asynchronous method, note the async keyword
  async function exampleAsyncFunction() {
    console.log("Start");

    // using the await keyword will wait for the completion
    //  of the asynchronous method execution before moving forward
    await delay(2000);

    // line of code that will be executed similarly to the synchronous model
    console.log("After 2 seconds");
  }

  exampleAsyncFunction();
  ```

- The _async_ keyword marks a method as being asynchronous, any result returned by this method will be wrapped in a promise

  ```javascript
  async function fetchUserDetails() {
    // simulates a call to a remote server
    // returns info about the user
    return { name: "Michael", likes: ["movies", "teaching"] };
  }
  ```

- The _await_ keyword will suspend the execution of the current method until the returned promise is completed

  ```javascript
  async function displayUserDetails() {
    const user = await fetchUserDetails();

    // instruction executed after the promise returned by the fetchUserDetails method is completed
    console.log(user);
  }
  ```

  - From this point of view, the async keyword replaces the use of the _then_ method, with all code defined after being executed after the promise is completed

- Error handling in the context of using try/catch is similar to error handling in a synchronous context, which reduces code complexity

  ```javascript
  async function displayUserDetails() {
    try {
      const user = await fetchUserDetails();
      // using the returned data
    } catch (error) {
      // error handling
    }
  }
  ```

## 5. Examples

1. [Using callbacks](./examples/callback.js)
2. [Callback hell](./examples/callback-hell.js)
3. [Using a promise](./examples/promise.js)
4. [Using async/await](./examples/async-await.js)
5. [Using the fetch method with a promise](./examples/fetch-promise.js)
6. [Using the fetch method with async/await](./examples/fetch-async-await.js)

## 6. Exercises

1. [Using callbacks](./practice/callback.js)
2. [Using a promise](./practice/promise.js)
3. [Using async/await](./practice/async-await.js)
