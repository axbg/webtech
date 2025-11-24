# Relationships between entities & back-end recap

## Table of contents

1. [Individual Work](#1-individual-work)

2. [Relationships between Entities](#2-relationships-between-entities)
   1. [One-to-One](#21-one-to-one)
   2. [One-to-Many / Many-to-One](#22-one-to-many--many-to-one)
   3. [Many-to-Many](#23-many-to-many)
   4. [Accessing Associated Entities](#24-accessing-associated-entities)

3. [The Relationship between Movies and Collections](#3-the-relationship-between-movies-and-collections)
   1. [Database Structure](#31-database-structure)
   2. [Implementing the relationship](#32-implementing-the-relationship)

4. [Back-end recap](#4-back-end-recap)

5. [Individual Work 2](#5-individual-work-2)

6. [Useful Resources](#6-useful-resources)

## 1. Individual Work

- As mentioned in the previous lab, the application we are developing, called _action!_, will help us manage multiple movie lists that we want to watch together with other friends

- In addition to the _Movie_ entity, which we've already implemented, we need to define two additional entities:
  - Collection
  - Person

- Next, we'll add the _Collection_ entity along with all the necessary components to implement RESTful endpoints based on it

- To-dos:
  - download the application in its [current version](https://github.com/axbg/webtech/releases/tag/app-after-lab-7)

  - install the required modules
    - the package.json file, which lists the required modules, is already defined, you just need to run one command :)
  - define the entity according to the following structure:
    - id: integer, primary key, auto-increment
    - name: string, not null
    - poster: string
  - import the entity into the database using the database configuration file

  - define a service that uses the entity and implements CRUD operations
    - create
    - read
    - update
    - delete

  - define a controller that calls the methods from this service and attaches the data to the response

  - define a routing file that will map paths to the controller methods
    - the HTTP methods must comply with the REST standard

  - import the routing file into the route aggregation file

  - test the application using Postman
    - you can start from the request collection defined in the postman_collection.json file included in the application's main directory

- To be able to go through each stage of back-end application development during the lab, the recommendation is to implement each endpoint one by one, in the following order:
  - create
  - read
    - listing
    - details of a collection
  - update
  - delete

## 2. Relationships between Entities

- So far, we've used Sequelize to map an object to a table in a SQLite database

- Besides the tables themselves, a very important part of relational databases is defining the relationships between tables

- According to SQL, relationships between tables can be defined as:
  - One-to-One
  - One-to-Many / Many-to-One
  - Many-to-Many

- For each relationship, Sequelize provides a series of methods that can be used
  - recommendation: each type of relationship between two entities has its perks, which is why going through the Sequelize documentation is necessary to understand all available options ([documentation](https://sequelize.org/docs/v6/core-concepts/assocs/))
  - recommendation: [video tutorial](https://www.youtube.com/watch?v=HJGWu0cZUe8) - exploring the options offered by Sequelize regarding relationships between entities
  - recommendation: as mentioned below, after setting up a relationship, Sequelize will automatically generate methods that will help us access the associated entities - [complete list of generated methods](https://sequelize.org/docs/v6/core-concepts/assocs/#basics-of-queries-involving-associations)

### 2.1 One-to-One

- [documentation](https://sequelize.org/docs/v6/core-concepts/assocs/#one-to-one-relationships)

```javascript
// consider the User and BankAccount entities
// a user can have only one account
// an account can be owned by one user only
User.hasOne(BankAccount);
BankAccount.belongsTo(User);

// the userId key will be automatically defined at the BankAccount table level
// the getBankAccount() method (on user entities) and getUser() method (on bank account entities) will be automatically generated
```

### 2.2 One-to-Many / Many-to-One

- [documentation](https://sequelize.org/docs/v6/core-concepts/assocs/#one-to-many-relationships)

```javascript
// consider the User and BankAccount entities
// a user can have multiple accounts
// an account can be owned by one user only
User.hasMany(BankAccount);
BankAccount.belongsTo(User);

// the userId key will be automatically defined at the BankAccount table level
// the getBankAccounts() method (on user entities) and getUser() method (on bank account entities) will be automatically generated
```

### 2.3 Many-to-Many

- [documentation](https://sequelize.org/docs/v6/core-concepts/assocs/#many-to-many-relationships)

```javascript
// consider the User and BankAccount entities
// a user can have multiple accounts
// an account can be owned by multiple users
User.belongsToMany(BankAccount, { through: "user_bank_accounts" });
BankAccount.belongsToMany(User, { through: "user_bank_accounts" });

// a junction table 'user_bank_accounts' will be generated by sequelize to store the relationships between the two entities
// the getBankAccounts() method (on user entities) and getUsers() method (on bank account entities) will be automatically generated
```

- In addition to automatically generating a junction table, Sequelize can also use an existing table in the Many-to-Many relationship
  - this type of definition can be useful if we want to include additional properties in the junction table

```javascript
const UserBankAccounts = sequelize.define("userBankAccounts", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: BankAccount,
      key: "id",
    },
  },
  bankAccountId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  // ... other fields
});

User.belongsToMany(BankAccount, { through: UserBankAccounts });
BankAccount.belongsToMany(User, { through: UserBankAccounts });
```

### 2.4 Accessing associated entities

- To optimize database communication, the generated methods are useful when we want to implement a _lazy_ loading scenario, as they will retrieve data only when called

- If, on the other hand, we want to implement an _eager_ loading scenario and retrieve associated entities from the database at the same time as the main entity, we can use the _include_ keyword in the query

```javascript
User.findAll({
  include: {
    model: BankAccount,
    // optional, we can specify only certain attributes that will be retrieved
    attributes: ["id", "iban", "amount"],
  },
});
```

- We notice that the associated object includes the junction table, confirming how the association was created

- In practice, however, this information is often unnecessary, which is why we can configure the query to remove it

```javascript
User.findAll({
  include: {
    model: BankAccount,
    // optional, we can specify only certain attributes to be retrieved
    attributes: ["id", "iban", "amount"],
    // exclude the junction table from the result
    through: {
      attributes: [],
    },
  },
});
```

## 3. The Relationship between Movies and Collections

### 3.1 Database Structure

- To observe the structure of tables as well as the relationships between them more easily, it's recommended to define a visual model that will be used as a reference by everyone involved in the project

- For the action! application, the database structure can be represented [as such](https://dbdiagram.io/d/action-app-6552a06e7d8bbd64651bf6dd):
  ![action! database structure](./assets/db.png)

- We observe that between the Movie entity and the Collection entity there is a junction table, Movie_Collection, which captures the many-to-many relationship between them

- In plain language, a movie can be included in multiple collections, and multiple collections can include the same movie

### 3.2 Implementing the Relationship

- To implement any relationship between two tables, it's recommended to define it in the database configuration file, right after the instantiation of each entity, applying the relationship in both directions (if needed)

```javascript
export const Movie = MovieTemplate(db, DataTypes);
export const Collection = CollectionTemplate(db, DataTypes);

Movie.belongsToMany(Collection, { through: "movie_collections" });
Collection.belongsToMany(Movie, { through: "movie_collections" });
```

- We can define any type of relationship in the same way, in the same section of the database configuration file

## 4. Back-end recap

- The purpose of a server application (back-end) is to accept requests from clients and respond with data, based on the characteristics of the requests (route, method, parameters)

- The most popular architectural style for writing a back-end application is [REST](../l7/README.md#1-rest), which specifies a series of recommendations that must be implemented by a _RESTful_ service

- To implement a server application (back-end) in Node.js using Express, we should follow the project structure recommended in [lab 6](../l6/README.md) and define the following components, starting, this time, from the database towards the client interface:
  1. [the model file](../../app/models/movies.js)
     - in practice, we'll have multiple model files, each defining a template for one table in the database

  2. [the database configuration file](../../app/models/config.js)
     - establishes the database connection details and aggregates all previously defined models
     - based on the previously defined templates, we'll instantiate the entities and export them

  3. [the service file](../../app/services/movies.js)
     - implements the application's business logic, using entities to read and write to the database
     - entities will be imported from the database configuration file

  4. [the controller file](../../app/controllers/movies.js)
     - handles a request by collecting all the data needed to fulfill it, using services

  5. [the route file](../../app/routes/movies.js)
     - defines all routes associated with a specific entity and connects them with specific methods from the controller

  6. [the route aggregation file](../../app/routes/config.js)
     - aggregates all individual files containing partial routes

  7. [the main file](../../app/app.js)
     - responsible for defining configurations applied at the entire application level
     - imports the route aggregation file and sets it on the main route
     - instantiates the web server and starts it, while also ensuring that all other necessary components are available (e.g., database)

- In addition to these necessary components, which will help us store information in a database and respond to client requests with relevant information, we can also define optional components:
  - middleware file
    - defines a method that will be called before the controller method
    - has access to the request and can add functionality (console logging, [error handling](https://medium.com/@arunchaitanya/understanding-normal-middleware-and-error-handling-middleware-in-express-js-d3ecbd9b9849)) or restrict access based on certain parameters (authentication and authorization)

## 5. Individual Work 2

- Try to implement the Many-to-Many relationship between the Movie and Collection entities, then modify the services of both entities to return, when needed, the associated entity along with the main entity, similar to the example discussed during the lab

- Additionally, you'll need to implement the Person entity along with all its related structures, and define a One-To-Many relationship between a Person and a Collection: a person can own multiple collections, a collection can be owned by a single person

- Person entity structure:
  - id: integer, primary key, auto-increment
  - firstname: string, not null
  - lastname: string
  - email: string, not null, isEmail

## 6. Useful Resources

- [dbdiagram](https://dbdiagram.io/home)
- [nodemon](https://www.digitalocean.com/community/tutorials/workflow-nodemon)
- [Implementing login functionality in Node.js](https://www.loginradius.com/blog/engineering/guest-post/nodejs-authentication-guide/)
