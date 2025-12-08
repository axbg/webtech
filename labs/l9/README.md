# Lab 9 - HTTP Client: HTML, CSS & JavaScript

## Table of contents

1. [The HTTP Client - Front-end](#1-the-http-client---front-end)
    1. [Components](#11-components)
    2. [HTML](#12-html)
    3. [CSS](#13-css)

2. [JavaScript in the Browser](#2-javascript-in-the-browser)
    1. [The DOM](#21-the-dom)
    2. [DOM Events](#22-dom-events)

3. [Project Structure](#3-project-structure)

4. [Back-end Integration](#4-back-end-integration)
    1. [Listing Movies](#41-listing-movies)
    2. [CORS](#42-cors)
    3. [Adding a new movie](#43-adding-a-new-movie)

5. [Individual Work](#5-individual-work)

## 1. The HTTP Client - Front-end

- In the first labs, we discussed the client-server model and the ability to execute JavaScript code both inside the browser and through a runtime that enables this (Node.js)

- We remember that any modern web application has 2 major parts - **back-end** (or server) and **front-end** (or client)

- In previous labs, we focused on implementing a back-end that encapsulates the necessary logic for writing and reading data from a database

- However, the REST API we developed is currently *consumed* only using the Postman client

- Although Postman is a very useful tool for development, it's not an interface that actual users of an application can use, which is why, by implementing the *front-end*, we'll develop a simplified interface that anyone can understand

![FE vs BE](https://a.storyblok.com/f/42126/dd3f75afe5/frontend-vs-backend-overview.png/m/1200x0/filters:quality(70)/)

### 1.1 Components

- **The front-end represents the visible and interactive part of a web application or website** - it's what users see and the main element they interact with

- The front-end includes everything that happens in a user's browser - the design of web pages, layout, styles, animations, and any other visible (or invisible) elements on the page

- Generally, we identify **3 main elements** that make up web client applications, the front-end of a system:
  - **a structural component** - **HTML** - defines the elements displayed on the page
  - **a styling component** - **CSS** - gives a pleasant appearance to structural elements
  - **a dynamic component** - **JavaScript** - allows the user to interact with the elements

![html, css,js](https://html-css-js.com/images/og.jpg)

### 1.2 HTML

- **HTML** (HyperText Markup Language) is a markup language used to create web pages that can be displayed in a browser

- [Recommendation: HTML in one hundred seconds](https://www.youtube.com/watch?v=ok-plXXHlWw)

- A very simple HTML page can be represented like this:

```HTML
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
  </head>
  <body>
    <h1>My First Heading</h1>
    <p>My first paragraph.</p>
  </body>
</html>
```

- Since HTML basics have already been discussed in the Multimedia course, we won't go into too much detail, but you can find a [cheatsheet here](https://htmlcheatsheet.com/) and a [tutorial here](https://www.w3schools.com/html/default.asp)

### 1.3 CSS

- **CSS** (Cascading Style Sheets) is a styling language, a web standard for formatting elements of an HTML document

- [Recommendation: CSS in one hundred seconds](https://www.youtube.com/watch?v=OEV8gMkCHXQ)

- CSS will be studied in the next lab, but briefly, we can identify the following characteristics:
  - **selectors**
    - CSS uses selectors to identify the HTML elements to which styles are applied

    - these can be specific elements, classes, IDs, or other selection criteria

    ```css
    /* element */
    body {
      font-family: 'Arial', sans-serif;
    }
    /* class */
    .title {
      color: #3366cc;
    }
    /* ID */
    #header {
      background-color: #f2f2f2;
    }
    ```

  - **properties**
    - CSS features an extensive set of properties to control the appearance of elements

    - among these are properties for font, color, dimensions, margins, spacing, etc.

    ```css
    p {
      font-size: 16px;
      color: #333333;
      margin-bottom: 10px;
    }

    .container {
      width: 80%;
      margin: 0 auto;
    }
    ```
  
  - **Style Specificity**
    - CSS uses a cascading system to determine the order of style application

    - it follows a certain hierarchy and gives developers control over style priority based on specificity and the order in which they are defined

    ```css
    /* increasingly specific access, starting from an element type, to a class, and then to an identifier */
    h1 {
      color: blue; /* Default style for all h1 elements */
    }

    .title {
      color: red; /* Specific style for classes with the "title" class */
    }

    #header h1 {
      color: green; /* Specific style for h1 inside the element with ID "header" */
    }
    ```

- You can find an extensive series of properties and selectors in the [CSS cheatsheet](https://htmlcheatsheet.com/css/)

## 2. JavaScript in the Browser

- The third component, **JavaScript**, a complete programming language, is used to ensure the dynamic component of web pages

- In this regard, there are two important topics to discuss:
  - the ways in which JavaScript can *directly interact with elements on the page*

  - how JavaScript is *notified* when a user interacts with displayed elements

### 2.1 The DOM

- A concept that explains the structure of the web page is the **DOM** (Document Object Model)

![DOM](https://www.w3schools.com/js/pic_htmltree.gif)

- The DOM is a tree-like representation of the objects that make up the structure and content of a web page

- Through this node-based structure, JavaScript can access, modify, and update the content, structure, and style of the HTML document dynamically

- The main characteristics of the DOM are:
  - **Tree Structure**
    - The DOM organizes the HTML document into a hierarchical tree, where each element is represented by a node
    - nodes can be elements, attributes, texts, or even comments

  - **Access and Manipulation**
    - web developers can use programming languages, such as JavaScript, to access and manipulate elements in the DOM
    - thus, they can change page content, add or remove elements, modify styles, and respond to events

  - **User Interaction**
    - the DOM is essential for creating interactivity in a web page
    - developers can respond to events and dynamically update page content without requiring a complete page reload

- Example of modifying the content of a node using JavaScript and the *document* object:

```js
// accessing an element from the DOM
const element = document.getElementById("heading");

// modifying the element's content
element.innerHTML = "My new heading";
```

- [Documentation of all DOM methods and properties accessible in JavaScript](https://developer.mozilla.org/en-US/docs/Web/API/Document)

### 2.2 DOM Events

- In addition to access, the DOM allows JavaScript to react to events that can occur as a result of the interaction between the user and visible elements on the page

![Event Handling in browser](https://1.bp.blogspot.com/-HI-_6gDQlcw/X3lj2sbrMSI/AAAAAAAAB9s/oUtLrzaCB9g9CwZprdpBchs3QGyDacjnwCLcBGAsYHQ/s1280/Events.jpg)

- Among the most common events are:
  - **Click**

  ```js
  document.getElementById("myButton").addEventListener("click", function() {
    // code that will execute on button click
  });
  ```

  - **Mouseover (hovering over an element)**

  ```js
  document.getElementById("myElement").addEventListener("mouseover", function() {
    // code that will execute when hovering over the element
  });
  ```

  - **Submit (submitting a form)**

  ```js
  document.getElementById("myForm").addEventListener("submit", function(event) {
    // code that will execute when submitting the form
    event.preventDefault(); // prevents the default form behavior
  });
  ```

  - **Change (change in an input)**

  ```js
  document.getElementById("myInput").addEventListener("change", function() {
    // code that will execute when the input value changes
  });
  ```

  - **Load (page load)**

  ```js
  window.addEventListener("load", function() {
    // code that will execute when the page is fully loaded
  });
  ```

## 3. Project Structure

- Generally, to allow good isolation of each component, we'll define each element in a separate file

- Thus, initially, the structure will be very simple:
  - **index.html** -> contains structural elements
  - **style.css** -> contains styles applied to elements
  - **script.js** -> contains interactions with defined elements

- Similarly, to organize the back-end separately from the front-end, we'll modify the *app* directory, moving all current content into a new subdirectory called *be*

- Subsequently, we'll create a new directory called *fe* where we'll define the 3 files mentioned above

- In the *index.html* file, we'll add the necessary elements for testing the structure:

```html
<html>
  <head>
    <title>action!</title>
    <link rel="stylesheet" href="style.css"/>
  </head>
  <body>
    <h1>Hello action!</h1>
  </body>
  <script src="script.js"></script>
</html>
```

- Although HTML files can be opened directly in the browser, to execute the requests we'll implement in the next step, we need all front-end files to be served by a web server

- The most popular web servers are nginx, Apache HTTP Server, and Microsoft IIS

- However, since our application is in the development phase, we'll use a utility to avoid installing and configuring a robust solution

- We'll install the *serve* package globally using the command:

```sh
npm install -g serve
```

- We'll navigate to the *fe* directory using the terminal, execute the *serve* command, and access the server started at the address indicated in the terminal

## 4. Back-end Integration

- The first step of integration is starting the back-end application, which will begin listening for requests on a certain port (by default 8080)

### 4.1 Listing Movies

- To list all movies existing in the database, we need to call the listing endpoint and display the content it returns

- We can reach an implementation variant by modifying the file contents as follows:
  - index.html

  ```html
  <html>
    <head>
      <title>action!</title>
      <link rel="stylesheet" href="style.css"/>
    </head>
    <body>
      <div class="container">
        <h1>This will be an awesome app!</h1>
        <!-- attaching an event handler for the click event on the button -->
        <button onclick="loadMovies()">Load movies</button>
        <h3>The movies available in the app are: </h3>
        <!-- defining an ID that can be used to identify the element at the JavaScript level -->
        <div id="moviesContainer">
          <p>Nothing loaded yet - click on the button to load the movies</p>
        </div>
      </div>
    </body>
    <script src="script.js"></script>
  </html>
  ```

  - style.css

  ```css
  .container {
    margin: 0 auto;
    width: 80%;
    text-align: center;
  }

  .movie-container {
    border: 1px solid black;
    padding: 10px;
    width: 20%;
    margin: 10px auto;
    cursor: pointer;
  }

  .movie-container:hover {
    background-color: whitesmoke;
  }

  .poster-container {
    max-height: 100px;
  }
  ```

  - script.js

  ```js
  function loadMovies() {
    // calling the movie listing endpoint
    fetch("http://localhost:8080/api/v1/movies")
      .then(response => response.json())
      .then(data => data.records)
      .then(movies => {
        // selecting an element from the page based on ID
        const moviesList = document.getElementById("moviesContainer");
        // clearing the content
        moviesList.innerHTML = "";

        // for each returned movie, a new series of HTML elements is generated, populated with data, and finally added to the page through the moviesList element
        for(let movie of movies) {
          // creating a new HTML element
          const item = document.createElement("div");
          // adding a CSS class to an element
          item.classList.add("movie-container");
          // attaching an event handler that will be called when the element registers a click event
          item.addEventListener("click", () => onMovieClick(movie));

          const movieName = document.createElement("p");
          // updating the text displayed inside the component
          movieName.innerText = movie.title + " (" + movie.year + ")";

          const moviePoster = document.createElement("img");
          // setting an attribute
          moviePoster.setAttribute("src", movie.poster);
          moviePoster.classList.add("poster-container");

          // attaching newly created elements to the newly created parent element
          item.appendChild(movieName);
          item.appendChild(moviePoster);

          // attaching the newly created parent element to the existing element on the page
          moviesList.appendChild(item);
        }
      });
  }

  function onMovieClick(movie) {
    // displaying a message as an alert
    alert("Directed by " + movie.director);
  }
  ```

### 4.2 CORS

- After implementing the code and reloading the accessed page, we'll notice a similar error in the browser console

![CORS Exception](./assets/cors.png)

- This is due to the Cross-Origin Resource Sharing (CORS) mechanism that doesn't allow a browser to call an API unless that API explicitly mentions that the address from which the browser is making the request is a valid address

- This mechanism aims to standardize and secure cross-domain access and must be configured very carefully!
  - [Recommendation: proper CORS configuration](https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/)

- During development, however, we can use a utility at the back-end level to allow its invocation from any domain:
  - Installing the *cors* package

  ```sh
  npm install --save cors
  ```

  - Modifying the main file to include the new package

  ```js
  import cors from "cors";

  //.. implementation
      
  const app = express();

  // process incoming JSON bodies in requests
  app.use(express.json());
  app.use(cors());

  //.. implementation
  ```

  - Restarting the server

- Retesting the request from the front-end works after configuring CORS at the back-end level

### 4.3 Adding a new movie

- To add a movie, we'll use a series of fields where we'll enter the necessary data (in short, a form) and a method to handle sending the request using this data:
  - index.html

  ```html
  <div>
    <p>Insert the details about the new movie</p>
    <form id="movieForm">
      <label for="title">Title:</label>
      <input type="text" id="title" name="title" required>

      <label for="year">Year:</label>
      <input type="number" id="year" name="year" required>

      <label for="director">Director:</label>
      <input type="text" id="director" name="director" required>

      <label for="genre">Genre:</label>
      <input type="text" id="genre" name="genre" required>

      <label for="synopsis">Synopsis:</label>
      <textarea id="synopsis" name="synopsis" required></textarea>

      <label for="duration">Duration (minutes):</label>
      <input type="number" id="duration" name="duration" required>

      <label for="poster">Poster URL:</label>
      <input type="url" id="poster" name="poster" required>

      <button type="button" onclick="addMovie()">Submit</button>
    </form>
  </div>
  ```

  - style.css

  ```css
  textarea {
    resize: vertical;
  }

  #movieForm {
    width: 30%;
    margin: 0 auto;
    text-align: left;
  }

  #movieForm input,
  #movieForm textarea {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 10px;
  }

  #movieForm button {
    width: 100%;
  }
  ```

  - script.js

  ```javascript
  function addMovie() {
    // extracting data from form fields
    const formData = {
      title: document.getElementById('title').value,
      year: parseInt(document.getElementById('year').value),
      director: document.getElementById('director').value,
      genre: document.getElementById('genre').value,
      synopsis: document.getElementById('synopsis').value,
      duration: parseInt(document.getElementById('duration').value),
      poster: document.getElementById('poster').value,
    };

    // calling the endpoint for creating a new movie
    fetch('http://localhost:8080/api/v1/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    // after successfully adding a new movie, the movie list at the front-end level is reloaded
      .then(response => loadMovies())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  ```

## 5. Individual Work

- Starting from the previous example, try to integrate into the page, after the sections implemented in the lab, the operations for listing all person entities from the database, and adding a new person using the specific endpoints
