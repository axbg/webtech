# HTTP Server: Node.js and Express

## Table of contents

1. [HTTP (recap)](#1-http-recap)
2. [Node.js](#2-nodejs)
3. [Modules](#3-modules)
4. [Node Package Manager](#4-node-package-manager-npm)
   1. [The package.json file](#41-the-packagejson-file)
   2. [Common commands](#42-common-commands)
   3. [Using external packages](#43-using-external-packages)
5. [Express](#5-express)
6. [Project structure](#6-project-structure)
   1. [Type-based structure](#61-type-based-structure)
   2. [Feature-based structure](#62-feature-based-structure)
   3. [Current project structure and Express Router](#63-current-project-structure-and-express-router)
7. [Middlewares](#7-middlewares)

## 1. HTTP (recap)

- As we learned in the previous labs, HTTP is a client-server protocol that operates through a message exchange process initiated by the client (a **request**), to which the host (also known as the **server**) responds (a **response**)

  ![Client-server architecture](https://res.cloudinary.com/lwgatsby/f_auto/www/uploads/2023/05/client-server-network.jpg)

- Every resource available on the web is stored on a server and can be accessed by any client through a URL (Uniform Resource Locator) which has the following structure:

```
[protocol]://[domain]/[path/to/resource?parameter1=value1&parameter2=value2]

example:
https://wikipedia.org/wiki/World_Wide_Web
```

- Besides the URL, the HTTP protocol defines a series of methods that describe the type of action a client performs through a request:
  - The most common HTTP methods are:
    - GET - requests information from the server
    - POST - requests storing new information on the server
    - PUT - requests updating information on the server
    - DELETE - requests deleting information from the server
    - ([all HTTP methods](https://www.w3schools.com/tags/ref_httpmethods.asp))

- After receiving a request, the server decides, based on the action, whether it can fulfill the client's request and associates a status with each response:
  - HTTP defines 5 status categories that describe the result of an action:
    - 100 - informational status
    - 200 - action was successful
    - 300 - redirect to another resource
    - 400 - client error
    - 500 - server error
    - ([all HTTP statuses](https://http.cat/))

- Throughout the following labs, we'll learn the basic concepts of web programming by implementing an application for managing personal movie collections

- We'll start by defining and implementing the server (_the back-end part_) and will later create a user interface (_the front-end part_) that we'll connect to the server

- We'll use JavaScript to implement both parts

## 2. Node.js

- To implement the back-end, we'll use Node.js, a very popular JavaScript runtime that has enabled the language for server-side application development, beyond its traditional front-end usage

- Defining a web server using Node.js

```js
const http = require("http");

// for now, we'll simulate connecting to a real database by using locally defined data
const movies = [
  "Synechdoche, New York",
  "i'm thinking of ending things",
  "mother!",
  "Aloners",
  "Blue Valentine",
  "aftersun",
];

http
  .createServer((req, res) => {
    res.write(JSON.stringify({ records: movies }));
    res.end();
  })
  .listen(8080);
```

- We can access the main route, the only one for now, by navigating in a browser to http://localhost:8080 or using Postman to send a GET request

- Although simple to read and understand for the moment, the code we wrote defines both the data persistence layer and the request handling layer in the same file

- In a complex application, this would make the code very hard to read and write, which is why each functionality should be defined in a _module_ that can be imported into other files

## 3. Modules

- A module represents a way to organize code by splitting it into multiple structures with reduced complexity that are independent and reusable

- In JavaScript, there are 2 standardized ways to define modules:
  - CommonJS - default in Node.js, uses the _module.exports_ and _require_ instructions

  ```javascript
  // mymodule.js
  const myFunction = () => {
    // ...
  };

  module.exports = {
    myFunction,
  };

  // main.js
  const myModule = require("./mymodule");
  myModule.myFunction();
  ```

  - ECMAScript modules (ESModules) - the de facto language standard, default on the front-end, uses the _export_ and _import_ instructions

  ```javascript
  // mymodule.js
  const myFunction = () => {
    // ...
  };

  export { myFunction };

  // main.js
  import { myFunction } from "./mymodule";
  myFunction();
  ```

- In our case, we'll create a new file called _movie.js_ where we'll define and export the _movies_ variable, then import it in the main file
  - For starters, we'll use CommonJS modules on the back-end, and we'll update the implementation later to use ESModules

- These types of modules are called _local modules_ because they allow us to export and import code defined in different files in a direct and quick way

- A collection of modules that work together and define a series of functionalities is called a _package_

- Very importantly, based on this mechanism, we can install and use _remote modules_, grouped in packages, which help us to import external code in our application to implement various functionalities

- The official package management system in Node.js is called Node Package Manager, or npm for short

## 4. Node Package Manager (npm)

- npm is one of the largest and most popular open-source package ecosystems, containing over _3 million_ packages used by over _17 million_ developers

- Due to its important role in the ecosystem, npm is installed together with node.js by default

- To import external modules in our application, we'll initialize a package using the _npm init_ command and fill in the required information

### 4.1 The package.json file

- After completing the previous step, we notice the creation of the _package.json_ file in the current directory

- This file is the main configuration file for packages, containing information about:
- the project's name and description
  - the project's standard dependencies and developer dependencies
    - developer dependencies are only needed during the development stage of the project
  - the project's version
  - scripts
  - author details
  - a license associated with the project
  - the application's entry file

  ```json
  // example package.json file
  {
    "name": "example-project",
    "version": "1.0.0",
    "description": "My first project",
    "main": "index.js",
    "scripts": {
      // scripts can be defined in this file and used later in the terminal
      // in this example, we'll be able to use the npm start command which will actually execute the node main.js command
      // generally, using scripts is recommended because they can define more complex behaviors that can be executed using a single command
      "start": "node main.js"
    },
    "author": "John Doe",
    "license": "MIT",
    "dependencies": {
      "lodash": "1.0.0"
    },
    "devDependencies": {
      "nodemon": "1.0.0"
    }
  }
  ```

- **This file is very important** - without it, external package imports cannot be managed
  - The contents of the package.json file are relatively dynamic, especially in the dependencies declaration area, and must be included in a project's repository, being part of it, not just a configuration file

### 4.2 Common commands

- **npm install**
  - used to install a package
  - followed by the package name, for example:

  ```bash
  npm install lodash
  ```

  - can receive the "-g" option to install globally, at system level
  - can receive the "-D" option to install a package that will only be used in development
  - can receive the "--save" option to save a dependency in the project's package.json file
  - similarly, there's the "--save-dev" option, equivalent to -D, to save a developer dependency

- **npm uninstall**
  - used to uninstall a package
  - followed by the package name, for example:

  ```bash
  npm uninstall lodash
  ```

- **npm init**
  - initializes a project and creates a package.json file with the configurations that were selected after executing the command
- **npm update**
  - updates a package and retrieves the latest available version from the npm registry
- **npm start**
  - starts a project
- **npm publish**
  - publishes a package to the npm registry
- **npm audit**
  - analyzes installed packages and determines if there are known vulnerabilities in current versions

### 4.3 Using external packages

- To see external package usage in practice, we'll install the _random_ package

```bash
npm install --save random
```

- In the main.js file, we'll implement a new route that will generate a random number and return information about the movie stored at that position in memory (in our case, in the defined array)

```javascript
const http = require("http");
const random = require("random");

const { movies } = require("./movies");

http
  .createServer((req, res) => {
    if (req.url === "/random") {
      const rnd = random.int(0, movies.length - 1);
      res.write(JSON.stringify({ movie: movies[rnd] }));
    } else {
      res.write(JSON.stringify({ records: movies }));
    }
    res.end();
  })
  .listen(8080);
```

- If we try to run the server now, we'll get an error: _Error [ERR_REQUIRE_ESM]_
  - This indicates that this package can no longer be imported using the classic syntax, CommonJS
  - In practice, CommonJS is not deprecated, but in the near future, more and more projects will migrate to ESModules, because it's the standard supported by the language (along with a few other advantages related to performance)

- To change the module type from CommonJS to ESModules, we need to:
  - Add the "type": "module" property in _package.json_
  - Rewrite the previous implementation using _import_/_export_ syntax

```javascript
// main.js
import http from "http";
import random from "random";

import { movies } from "./movie.js";

http
  .createServer((req, res) => {
    if (req.url === "/random") {
      const rnd = random.int(0, movies.length - 1);
      res.write(JSON.stringify({ movie: movies[rnd] }));
    } else {
      res.write(JSON.stringify({ records: movies }));
    }

    res.end();
  })
  .listen(8080);
```

```javascript
//movie.js
export const movies = [
  "Synechdoche, New York",
  "i'm thinking of ending things",
  "mother!",
  "Aloners",
  "Blue Valentine",
  "aftersun",
];
```

## 5. Express

- Node.js is a complex and powerful environment, but we notice that, although simple at first glance, it wasn't explicitly created for managing multiple routes (also called endpoints), something very common in web servers

- In practice, code modularity is a very important characteristic, which is why, to help developers write code in a more organized way, multiple frameworks have emerged that can be used _on top_, extending the runtime's functionalities

- The most popular framework for writing web servers in Node.js is [Express](https://www.npmjs.com/package/express)

- Before we can use Express, we need to install it:

```bash
npm install --save express
```

- Using Express, we can rewrite the previous implementation, having at our disposal much more powerful methods for defining endpoints and their actual implementation

```javascript
import express from "express";
import random from "random";
import { movies } from "./movie.js";

const PORT = 8080;

const app = express();

// the HTTP method for which this handler will be attached
app.get("/", (req, res) => {
  // req contains details about the request
  // res contains details about the response
  res.send({ records: movies });
});

// compared to the previous method, in express the order of the endpoints doesn't matter
app.get("/random", (req, res) => {
  const rnd = random.int(0, movies.length - 1);
  res.send({ movie: movies[rnd] });
});

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`),
);
```

- Depending on the method, a request can contain several types of data that are processed by the server to generate a correct response

- The types of data that can accompany a request are:
  - Header parameters (header params) - mostly used for metadata
  - Query parameters (query params)
  - Path parameters (path params)
  - Body parameters (body params)

- For GET requests, which aim to obtain information from the server, we can use query and path parameters:
  - Query parameters are defined at the end of the URL, using the specific markup _?parameterName=value_
  - Path parameters are part of the URL and uniquely identify the requested resource _movie/1_

- Query parameters are used when we inform the server about some variables it needs to take into account when performing the invoked action

```javascript
// will respond to a request like http://localhost:8080/search?title=moth
app.get("/search", (req, res) => {
  // accessing query parameters
  const requestedTitle = req.query.title;
  const identifiedMovie = movies.find((movie) =>
    movie.includes(requestedTitle),
  );

  if (!!identifiedMovie) {
    res.send({ movie: identifiedMovie });
  } else {
    // remember that each response has an attached status that informs the client about
    // the status of the response
    res.status(404).send({ message: "Movie not found" });
  }
});
```

- Unlike query parameters, path parameters are used to uniquely identify an entity on the server

```javascript
app.get("/:id", (req, res) => {
  // accessing path parameters
  const id = req.params.id;
  // we'll consider the id as the element's index in the movies array
  const identifiedMovie = movies[id];

  if (!!identifiedMovie) {
    res.send({ movie: identifiedMovie });
  } else {
    res.status(404).send({ message: "Movie not found" });
  }
});
```

- For requests that aim to modify existing data at the server level, such as POST, PUT or PATCH, besides query and path parameters, we can also use body parameters, which are much more complex and can have different formats

- "Because of" these multiple formats that can be used, before we can process the body of a request, we need to inform express about the format we'll use

- Like most web applications, the body we'll send to the server will be structured as JSON, which is why we need to add, right after defining the app variable, the instruction

```javascript
app.use(express.json());
```

- Afterwards, we'll be able to implement an endpoint that enables us to add a new movie to the existing movie list

```javascript
// notice the use of the post method to handle a POST request
app.post("/", (req, res) => {
  // accessing body parameters
  // what do you think will happen if we delete the line added in the previous step?
  // will we still be able to access the title parameter?
  const newMovie = req.body.title;

  // if the movie doesn't already exist, we add it
  if (!movies.includes(newMovie)) {
    movies.push(newMovie);
  }

  res.status(201).send({ result: "Movie was created" });
});
```

- **Using the previous examples, try to define two new endpoints yourself:**
  - the first will modify a movie's name with a value received as a parameter
  - the second will delete a movie by name from the movie list
  - besides correctly implementing the two operations, you need to choose the correct HTTP methods - use the previous lab (or the Internet) to understand which methods you should use

- Although Express helps us define routes in a more organized way, by default, we'll end up implementing the entire application in a single file, which is not recommended, considering that it will become very hard to read as the application grows

- For organizing back-end projects, there are 2 main structure options: _type-based structure_ and _feature-based structure_

## 6. Project structure

### 6.1 Type-based structure

- In this model, the source code is grouped and organized based on the type of the components

- Usually, these types include:
  - **models directory**
    - description of entities used in the application
  - **controllers directory**
    - logic for handling HTTP requests, manipulating data from requests and building responses
  - **routes directory**
    - the connection between HTTP requests and controllers
    - routes establish how different requests are handled and directed to the appropriate controller
  - **services directory**
    - methods that implement complex functionalities and are used in controllers

```
    app/
    ├── controllers/
    │   └── movie.js
    ├── models/
    │   └── movie.js
    ├── routes/
    │   └── movie.js
    ├── services/
    │   └── movie.js
    ├── main.js
    └── package.json
```

### 6.2 Feature-based structure

- In this model, code is grouped based on the application's characteristics or functionalities

```
    app/
    ├── movie/
    │   ├── controller.js
    │   ├── model.js
    │   └── route.js
    │   └── service.js
    ├── main.js
    └── package.json
```

- In this example, we can see how, for a feature related to movie management, which has its own independent directory in the application structure, there's a controller, a model, and a file defining specific routes

### 6.3 Current project structure and Express Router

- In this lab, we'll organize the project **by type**, rewriting the current application to follow the structure shown earlier

```
    app/
    ├── controllers/
    │   └── movie.js
    ├── models/
    │   └── movie.js
    ├── routes/
    │   └── movie.js
    ├── services/
    │   └── movie.js
    ├── main.js
    └── package.json
```

- To be able to separate routes from controllers and import them later in the main file, we'll use _Express Router_ and we'll split the main.js file into 3 distinct files:
  - routes/movie.js

  ```javascript
  import express from "express";
  import * as movieController from "../controllers/movie.js";

  export const router = express.Router();

  // get routes
  router.get("/", movieController.getMovies);
  router.get("/random", movieController.getRandomMovie);
  router.get("/search", movieController.search);
  router.get("/:id", movieController.getById);

  // post routes
  router.post("/", movieController.create);

  // other routes
  ```

  - controllers/movie.js

  ```javascript
  import * as movieService from "../services/movie.js";

  const getMovies = (req, res) => {
    res.send({ records: movieService.getMovies() });
  };

  const getRandomMovie = (req, res) => {
    res.send({ movie: movieService.getRandomMovie() });
  };

  const search = (req, res) => {
    const identifiedMovie = movieService.search(req.query.title);

    if (!!identifiedMovie) {
      res.send({ movie: identifiedMovie });
    } else {
      // remember that each response has an attached status that informs the client about
      // the status of the response
      res.status(404).send({ message: "Movie not found" });
    }
  };

  const getById = (req, res) => {
    const identifiedMovie = movieService.getById(req.params.id);

    if (!!identifiedMovie) {
      res.send({ movie: identifiedMovie });
    } else {
      res.status(404).send({ message: "Movie not found" });
    }
  };

  const create = (req, res) => {
    movieService.create(req.body.title);
    res.status(201).send({ result: "Movie was created" });
  };

  // other methods

  export { getMovies, getRandomMovie, search, getById, create };
  ```

  - services/movie.js

  ```javascript
  import random from "random";
  import { movies } from "../models/movie.js";

  const getMovies = () => {
    return movies;
  };

  const getRandomMovie = () => {
    const rnd = random.int(0, movies.length - 1);
    return movies[rnd];
  };

  const search = (title) => {
    return movies.find((movie) => movie.includes(title));
  };

  const getById = (id) => {
    return movies[id];
  };

  const create = (title) => {
    if (!movies.includes(title)) {
      movies.push(title);
    }
  };

  // other methods

  export { getMovies, getRandomMovie, search, getById, create };
  ```

  - main.js

  ```javascript
  import express from "express";
  import { router as movieRouter } from "./routes/movie.js";

  const PORT = 8080;

  const app = express();
  app.use(express.json());

  // attaching routes handling movies
  app.use("/movie", movieRouter);

  app.listen(PORT, () =>
    console.log(`Server started on http://localhost:${PORT}`),
  );
  ```

- Thus, we obtain a better organized project which, as new functionalities and entities are introduced, will expand _horizontally_ (more files), as opposed to the previous example when it would have expanded _vertically_ (a very long file)

## 7. Middlewares

- In the context of a web server, a middleware represents an intermediate method that's executed before a request is processed

- In a middleware, we can implement functionalities specific to web servers, but with general characteristics that can be integrated into multiple endpoints:
  - logging
  - authentication
  - error handling

- Being a different type of component, we'll create a file that describes the middleware's functionality in a new directory called _middlewares_

- Using a middleware, we can implement, for example, a method that logs the time and path on which a request was registered:

```javascript
// middlewares/logging.js
export const logRequestDetails = (req, res, next) => {
  console.log(`${new Date()}: ${req.path}`);
  next();
};
```

- To apply this middleware globally, for every request, we'll import and use it in main.js

```javascript
import { logRequestDetails } from './middlewares/logging.js';
....
app.use(logRequestDetails);
```

- If we want to use it only in a specific group of endpoints, such as movies, we can import and use it at the _routes/movie.js_ file level

```javascript
import { logRequestDetails } from '../middlewares/logging.js';
...
router.use(logRequestDetails);
```

- A very important scenario where a middleware is generally used is **authentication**
  - [Recommendation: authentication using Express](https://www.youtube.com/watch?v=xEh6Cb1PSAg)
