# REST, databases and ORMs

## Table of contents

1. [REST](#1-rest)
    1. [What is REST?](#11-what-is-rest)
    2. [REST Characteristics](#12-rest-characteristics)
    3. [REST and CRUD](#13-rest-and-crud)
    4. [API vs Endpoint](#14-api-vs-endpoint)

2. [Data Persistence](#2-data-persistence)
    1. [Relational Databases](#21-relational-databases)
    2. [SQLite](#22-sqlite)
    3. [Sequelize](#23-sequelize)

3. [Individual Work](#3-individual-work)

## 1. REST

### 1.1 What is REST?

- **REST** (**RE**presentational **S**tate **T**ransfer) is an architectural style used for developing web applications, introduced in 2000 [in Roy Fielding's doctoral dissertation](https://ics.uci.edu/~fielding/pubs/dissertation/fielding_dissertation.pdf)

- This architecture has at its core the concept of *resource*, representing the complex data types that make up the application itself

- Within a REST system, a *client* communicates with a *server* through a *uniform interface* that describes a collection of resources that can be created, listed, queried, updated, or deleted
 ![rest-api-diagram](https://images.ctfassets.net/vwq10xzbe6iz/5sBH4Agl614xM7exeLsTo7/9e84dce01735f155911e611c42c9793f/rest-api.png)

### 1.2 REST Characteristics

- Fundamentally, REST is a series of best practices aimed at defining a scalable system using native web tools

- The most important REST characteristics are:
  1. Client-server architecture
  2. Using resources as a way of representing data
  3. Uniform interface
      - all resources described within a system can be used through an identical interface from a structural point of view
  4. Statelessness between requests
      - in a REST system, any request made by a client must contain all the information necessary for its fulfillment
  5. Using HTTP verbs to describe a series of standard operations that can be performed on resources
  6. System layering
      - to allow system scaling, the existence of intermediaries, such as proxy servers or caching mechanisms, should not affect the system's functionality in any way
  7. Using cache
      - to improve system performance, parts can implement caching mechanisms that reuse, for a certain period of time, responses already generated

- Beyond these mandatory principles, we can also define a series of additional recommendations that provide even more support for the correct implementation of REST services:
  - Using JSON as the data transfer format
  - Using plural nouns instead of verbs in URLs
  - Correct and uniform use of status codes
  - Using filtering, sorting, and pagination to make resource access more efficient
  - Implementing a URL versioning system

- When all general REST principles are applied, we talk about a *RESTful* API, whereas if some of them are not properly implemented, we talk about a *REST-like* API

- Recommendation: you can find more examples [here](https://www.freecodecamp.org/news/rest-api-best-practices-rest-endpoint-design-examples/)

### 1.3 REST and CRUD

- Although often used as equivalents, REST and CRUD are two different concepts that are frequently linked together

- CRUD is an acronym for CREATE, READ, UPDATE, DELETE and expresses the main types of actions that can be executed on a resource

- Given that REST is based on the concept of resources, CRUD operations can be used, along with HTTP verbs, to describe a REST API:
  - CREATE - POST - creating a resource
  - READ - GET - reading a resource
  - UPDATE - PUT/PATCH - updating a resource
  - DELETE - DELETE - deleting a resource

### 1.4 API vs Endpoint

- Generally, when we talk about REST, we do so in the context of a REST API

- An API, acronym for Application Programming Interface, is a collection of methods expressed through URLs that enable clients to use resources defined at the server level

- Each method (URL) present in an API is called an endpoint, so we can say that **an API is a collection of endpoints**

- ![api-vs-endpoint](https://assets-global.website-files.com/5ff66329429d880392f6cba2/625e52cd0b6c58527f5819d5_Endpoints%20of%20the%20API%20-%20clearly.jpg)

- In short, the API defines the rules and general interface for communicating with a computer system, while endpoints represent the specific locations within the API where resources can be accessed or various operations can be invoked

- **Exercise**: starting from [the current version of the application](../../app/), try to refactor everything to comply with the REST principles listed above
  - don't be afraid to delete endpoints and functionalities if they are not necessary - when using a version control system like git, deleted code is never lost, in case we need it later
  - the steps you can follow to implement this requirement are:
    - modify the value of all paths, including the plural form of the noun used (in this case /movie/ will become /movies/)
    - rename all movie.js files to movies.js to synchronize the project structure with the interface
    - delete the *random* endpoint, which implements an action and does not respect REST principles
      - since it will no longer be used, you can also uninstall the "random" package added in the previous lab (you need to use an npm command to uninstall it properly)
    - delete the search endpoint, which also represents an action, and move the related logic to the listing endpoint, which will now support *filtering* results based on words in the title
    - implement API versioning so that a request previously handled on the route */movies/* is now handled on the route */api/v1/movies/*

## 2. Data Persistence

- An advantage offered by implementing a REST API is achieving a high degree of consistency between how data is represented on the server and how it will be exposed to the clients, which is why resource modeling becomes even more important
  - Recommendation: for defining the structures that make up the persistence layer, you can use a tool like [dbdiagram](https://dbdiagram.io/home)

- In this context, data persistence refers to the ability to store and maintain the data represented by resources in a durable and secure manner for an extended period

- Data persistence is most often ensured through the use of databases, which can be:
  - relational (SQL) - database management systems that use tables and relationships to store data in a structured way
    - e.g., MySQL, PostgreSQL, Microsoft SQL Server
  
  - non-relational (NoSQL) - data storage solutions that don't rely on tables and relationships, but use other data models, such as documents, graphs, or key-value pairs
    - e.g., MongoDB, Cassandra, Redis

- In this lab we will discuss *only* the use of relational databases, however, you can read more about using a non-relational database, such as [MongoDB](https://www.geeksforgeeks.org/mongodb-tutorial/) and the [mongoose](https://mongoosejs.com/docs/) ORM

### 2.1 Relational Databases

- Relational databases are, in general, standalone applications that are instantiated as a server to which a back-end application connects and executes SQL queries

- This server is responsible for managing and administering the database, as well as for the actual execution of all requests and calculating results

- In complex applications, using such a solution is a standard choice, however, in this lab, to reduce the number of external dependencies, we will use a self-contained database: *SQLite*

### 2.2 SQLite

- SQLite is an embedded SQL database engine that does not require a database server

- It doesn't require any configuration and can be used immediately for data storage, which will be done in the form of a single file

- Because there is no server to execute queries on the database, the back-end application is the one that will do this, which is why we need to install a library that implements the SQLite engine

```bash
npm install --save sqlite3
```

- To test the connection to a SQLite database and execute test queries, we will install the [SQLite](https://marketplace.visualstudio.com/items?itemName=alexcvzz.vscode-sqlite) extension available for Visual Studio Code
- [usage tutorial](https://www.youtube.com/watch?v=JrAiefGNUq8)

- Generally, when we discuss the interaction between an application and a relational database, two main directions can be followed:
  1. Composing and directly executing SQL queries
      - this is a procedure that allows the programmer to have complete control over the executed queries, but requires direct modification of queries every time a model changes or a new functionality needs to be implemented

  2. Using an ORM (Object-relational mapping)
      - an ORM is a tool that allows the definition of objects through which SQL queries will be automatically generated depending on the desired operation

- In the industry, *all* complex applications use ORMs, the most important advantages being:
  - simplified, programmatic, OOP interaction with the database
  - code portability that can be used with multiple databases without requiring modifications
  - reduced development time
  - code separation and hiding of database-specific concepts behind general abstractions
  - optimization of generated queries and their implicit security

### 2.3 Sequelize

- Sequelize is a popular ORM for Node.js that be used with a wide range of databases

- Before we can use Sequelize, we need to install the corresponding library

```bash
npm install --save sequelize
```

- To connect to a database, we will add a new file, *config.js*, in the *models* directory where we will define the details required for connection:

```javascript
import { Sequelize } from "sequelize";

export const db = new Sequelize({
  // specify the type of database we will use
  dialect: "sqlite",
  // the file in which data will be stored will be generated when the application starts
  storage: "action.db" 
});

// method that will be called to prepare the database connection
//  the method is async because the authenticate and sync operations are asynchronous andwe use the await keyword
//      to wait for execution to complete
export const synchronizeDatabase = async () => {
  // verify the database connection
  await db.authenticate();
  // create / update tables at the database level
  await db.sync();
};
```

- Beyond the general database configuration, we will define an entity to describe the Movie resource that we previously represented as an array and which will now have the following structure:
  - id: integer, primary key, autoincrement
  - title: string, not null
  - year: integer, not null, > 1900
  - director: string, not null
  - genre: string
  - synopsis: text
  - duration: integer
  - poster: string

- To define the entity using Sequelize, we will rewrite the content of the existing *movies.js* file and add the implementation:

```javascript
// importing the database config defined in the config.js file
import { db } from "./config.js";
// importing the data types supported by sequelize
import { DataTypes } from "sequelize";

// we will delete the previous implementation after we update the code used in the movies.js service
export const movies = ["Synechdoche, New York", "i'm thinking of ending things", "mother!", "Aloners", "Blue Valentine"];

// defining a new table named Movie
export const Movie = db.define("Movie", {
  id: {
    // field type
    type: DataTypes.INTEGER,
    // primary key
    primaryKey: true,
    // autoincrement
    autoIncrement: true
 },
  title: {
    type: DataTypes.STRING,
    // not null constraint
    allowNull: false
 },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // validating that the minimum value that can be stored is greater than 1900
    validate: {
      min: 1900
 }
 },
  director: {
    type: DataTypes.STRING,
    allowNull: false
 },
  genre: {
    type: DataTypes.STRING
 },
  synopsis: {
    // using a data type that allows insertion of large text
    type: DataTypes.TEXT
 },
  duration: {
    // using an efficient data type, consistent with the value range of the field
    type: DataTypes.TINYINT
 },
  poster: {
    type: DataTypes.STRING
 }
}, 
{
  indexes: [
 {
      // defining a uniqueness constraint based on the triplet title, year, director
      unique: true,
      fields: ['title', 'year', 'director']
 }
 ]
});
```

- If we run the application, we won't notice any difference yet, because, although defined, the database and the Movie model have not been directly invoked, which we will do by calling the *synchronizeDatabase* method in the application's entry point

```javascript
// start listening for connections
import { synchronizeDatabase } from "./models/config.js";
// .....
// we will store in the server variable the server configuration returned by the listen method
//      the method is async because, inside, we will use the await keyword on the synchronizeDatabase method to wait for the completion
//          of the synchronization process
const server = app.listen(PORT, async () => {
  try {
    // call the method that will synchronize the models defined in the application with the database
    await synchronizeDatabase();
    console.log(`Server started on http://localhost:${PORT}`);
 } catch (err) {
    console.log("There was an error with the database connection");
    // if an error occurs during database synchronization, we will stop the application
    server.close();
 }
});
```

- When restarting the application, we will see in the console the queries executed by Sequelize to generate the Movie table at the database level, where we will find, besides the explicitly configured fields, two administrative fields added automatically: *createdAt* and *updatedAt*

```
Executing (default): SELECT 1+1 AS result
Executing (default): SELECT name FROM sqlite_master WHERE type='table' AND name='Movies';
Executing (default): CREATE TABLE IF NOT EXISTS `Movies` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `title` VARCHAR(255) NOT NULL, `year` INTEGER NOT NULL, `director` VARCHAR(255) NOT NULL, `genre` VARCHAR(255), `synopsis` TEXT, `duration` TINYINT, `poster` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
Executing (default): PRAGMA INDEX_LIST(`Movies`)
Executing (default): CREATE UNIQUE INDEX `movies_title_year_director` ON `Movies` (`title`, `year`, `director`)
```

- We can confirm the table creation using the SQLite extension in Visual Studio Code installed earlier

- The last step we need to implement is updating the movie management service to use the Movie entity instead of the movies array (which we can delete at the end of the refactoring)

- We update each method in the service one by one, observing how we can insert, update, extract, and delete data using the Movie entity

```javascript
import { Op } from "sequelize";
import { Movie } from "../models/movies.js";

export const getMovies = async (query) => {
  // extract all fields defined at the Movie entity level
  //   these will be used to validate the filters received
  const entityKeys = Object.keys(Movie.getAttributes());

  // remove from the query object properties for which we don't want to apply filtering
  delete query.id;
  delete query.poster;

  // define a dynamic selection condition based on the fields received in the call
  //  but first we will filter the received criteria that don't represent valid fields for the Movie entity
  const whereConditions = Object.keys(query)
 .filter(key => entityKeys.includes(key))
 .map(key => {
      // for the title and director properties we want a partial match
      //  which can be verified using the like operator
      if (key === "title" || key === "director") {
        return { [key]: { [Op.like]: `%${query[key]}%` } }
 }

      // for all other fields we want to test equality
      return { [key]: query[key] }
 });

  // we will use the movie entity to return all movies
  return await Movie.findAll({
    // projection that will return only a part of the table fields
    attributes: ['id', 'title', 'year', 'director', 'genre', 'poster'],
    // the where condition built earlier that will filter the returned movies
    where: whereConditions
 });
};

export const getById = async (id) => {
  // we will use the movie entity to return a movie
  return await Movie.findOne({
    // that has the id received as a parameter
    where: {
      id: id
 }
 });
};

export const create = async (movie) => {
  // before insertion, check if the movie is already in the database
  const existingMovies = await getMovies({ title: movie.title, director: movie.director, year: movie.year });

  if (existingMovies.length !== 0) {
    // if there's a movie published in the same year, with the same name and the same director
    //  throw an exception
    throw new Error("Movie already exists");
 }

  // creating a new movie
  //  the fields existing inside the received parameter must have the same name as the fields in the table
  //      otherwise, Sequelize will ignore them and try to insert only the fields for which it can ensure identity
  return await Movie.create(movie);
};

export const update = async (movieUpdateData) => {
  // extract a movie based on id
  const movie = await Movie.findOne({
    where: {
      id: movieUpdateData.id
 }
 });

  // if the movie exists, update it in the database
  if (!!movie) {
    // we will delete from the object that will be used for updating the id property, to not allow overwriting it
    delete movieUpdateData.id;
    // we will update all other properties present in the received parameter
    //  as in the case of creation, fields in the movieUpdateData object must have the same name as in the table
    movie.set({
 ...movieUpdateData
 });

    // save the changes made to the identified entity
    await movie.save();
 }
}

export const remove = (id) => {
  // deleting a movie based on the id received as a parameter
  Movie.destroy({
    where: {
      id: id
 }
 });
}
```

- Also, because we introduced a series of major differences regarding the structure of a movie at the application level, we need to update the corresponding controller to implement more complex functionalities
  - **analyze the code and try to transpose all the changes made to your application**

 ```javascript
  import * as moviesService from "../services/movies.js";

  const getMovies = async (req, res) => {
    res.send({ movies: await moviesService.getMovies(req.query) });
  };

  const getById = async (req, res) => {
    const identifiedMovie = await moviesService.getById(req.params.id);

    if (!!identifiedMovie) {
      res.send({ movie: identifiedMovie });
    } else {
      res.status(404).send();
    }
  };

  const create = async (req, res) => {
    if (!req.body.title || !req.body.director || !req.body.year) {
      return res.status(404).send({ message: "Missing title, director or year" });
    }

    try {
      const movie = await moviesService.create(req.body);
      res.status(201).send({movie: movie})
    } catch (ex) {
      res.status(500).send({ message: ex.message });
    }
  };

  const update = async (req, res) => {
    if (!req.body.id) {
      return res.status(400).send({ message: "Movie id is mandatory" });
    }

    await moviesService.update(req.body);
    res.status(204).send();
  }

  const remove = (req, res) => {
    moviesService.remove(req.params.id);
    res.send();
  }

  export {
    getMovies,
    getById,
    create,
    update,
    remove
  }
 ```

- We notice that the route structure has not been affected, which is why, except for the body sent in the create and update methods, the API maintains the same interface
  - Use Postman to execute requests and the SQLite extension to observe the data at the database level as it is created and updated

- Recommendation: Sequelize has many functionalities that can simplify the creation and execution of queries - read more in the [official documentation](https://sequelize.org/docs/v6/getting-started/)

## 3. Individual Work

- Following the example for the Movie entity, try to define all the necessary structures for implementing two new entities: Person and Collection
  - Person entity structure
    - id: integer, primary key, autoincrement
    - firstname: string, not null
    - lastname: string
    - email: string, not null, isEmail

  - Collection entity structure
    - id: integer, primary key, autoincrement
    - name: string, not null
    - poster: string

- For each entity you need to implement one endpoint that allows:
  - listing (with filtering support)
  - extracting data about an individual record
  - creating a record
  - updating a record
  - deleting a record

- The application works correctly only when all layers are implemented and tested - be careful not to forget any :)
