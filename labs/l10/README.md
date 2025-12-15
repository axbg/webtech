# CSS: UI on the Web

## Table of contents

1. [Displaying Elements on the Page](#1-displaying-elements-on-the-page)

2. [Positioning Elements](#2-positioning-elements)
   1. [Basic Positioning](#21-basic-positioning)
   2. [Flexbox](#22-flexbox)
   3. [Grid](#23-grid)

3. [Responsiveness - Adapting Interfaces to Device Size](#3-responsiveness---adapting-interfaces-to-device-size)

4. [Using External Styles](#4-using-external-styles)

5. [Implementing a Layout](#5-implementing-a-layout)

6. [Individual Work](#6-individual-work)

## 1. Displaying Elements on the Page

- When an HTML file is rendered into a web page, each browser's HTML engine associates a rectangle (**box**) with each specified element by default, following a model called the **box model**

- Using CSS, we can modify the positioning, dimensions, and properties of each box, thereby styling the structural elements defined through HTML

- The box model defines **4 components**:
  - **content** - the actual content of the element (e.g., text, image, etc.)
  - **padding** - the space between the content and the element's border
  - **border** - a line that delimits the element's box
  - **margin** - the space between the element's border and adjacent elements

- To analyze how an element is displayed by the browser, you can use _Developer Tools_, in the _Elements_ section, and by activating the _Select_ function, you can view the box model of any element

- When selecting any element on the page, you'll notice something similar on the right side of the inspector, in the _Computed_ tab:

![box model](https://www.simplilearn.com/ice9/free_resources_article_thumb/CSS-Box-Model.png)

## 2. Positioning Elements

- To simplify user interaction with graphical interfaces, components must be arranged in a way that makes content easy to access and understand

- This is primarily achieved through the correct positioning of elements within a layout, making it easy to navigate

### 2.1 Basic Positioning

- The basic property exposed by CSS for controlling an element's position on the page is **position**, which removes elements from the predefined display order and creates a new layout

- [Recommended - position property documentation](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning)

  ![positioning](https://internetingishard.netlify.app/css-positioning-schemes-790d5b.3d581d20.png)

- The most common values used in practice are:
  - **static** - the default positioning of elements, placed in the normal document flow

  ```css
  .element {
    position: static;
  }
  ```

  - **relative** - the element is positioned relative to its normal position
    - other elements in the normal flow behave as if the element hadn't moved

    ```css
    .element {
      position: relative;
      top: 10px;
      left: 20px;
    }
    ```

  - **absolute** - the element is removed from the normal flow and it's positioned relative to the nearest ancestor element with an explicit positioning
    - if no such ancestor element exists, positioning is relative to the document

    ```css
    .element {
      position: absolute;
      top: 30px;
      left: 50px;
    }
    ```

  - **fixed** - the element is removed from the normal flow and positioned relative to the browser window
    - the element will remain at the same position even when the user scrolls

    ```css
    .element {
      position: fixed;
      top: 0;
      right: 0;
    }
    ```

## 2.2 Flexbox

- **Flexbox** (short for Flexible Box) is a CSS layout model that facilitates the arrangement and alignment of elements within a container

- The main idea in flexbox layout is to give the container the **ability to modify the dimensions** (and, where appropriate, the order) **of child elements** to optimally occupy the available space

- In this regard, a flex container will either **expand** component elements to occupy available space or **shrink** them to prevent overflow

- [Recommended - flexbox usage guide with examples](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

- To use Flexbox, set the container's display property to **flex** or **inline-flex**

```css
.container {
  display: flex;
  /* or display: inline-flex; to create an inline flex container */
}
```

- Flexbox exposes properties for defining the behavior of a flex container or its children, through which you can set:
  - **arrangement** of elements on the main and cross axes using the flex-direction, justify-content, and align-items properties

  - **alignment** of elements within the container on the main and cross axes (e.g., _align-self_)

  - **ordering** of elements

- A graphical representation of the main flexbox properties is:
  ![Flexbox](https://i.redd.it/rofzm44oka091.png)

## 2.3 Grid

- **CSS Grid Layout** (Grid or CSS Grid) is a model that defines a complex and flexible **two-dimensional layout**, made up of rows and columns

- [Recommended - Grid usage guide with examples](https://css-tricks.com/snippets/css/complete-guide-grid/)

- Similar to flexbox, to use Grid, you must set the container's display property to **grid**

```css
.container {
  display: grid;
}
```

- The most important grid properties are the ones defining the layout structure using rows and columns

```css
.container {
  display: grid;
  grid-template-columns: 100px 200px 100px; /* three columns with fixed dimensions */
  grid-template-rows: 50px 100px; /* two rows with fixed dimensions */
}
```

![CSS grid](https://www.freecodecamp.org/news/content/images/2022/05/CSS-GRID-3.png)

## 3. Responsiveness - Adapting Interfaces to Device Size

- **Responsiveness** refers to a web page's ability to adapt to the screen size from which it's accessed, providing an optimal user experience on any type of device, from desktops and laptops to tablets and mobile phones

  ![responsiveness](https://mir-s3-cdn-cf.behance.net/project_modules/hd/35d0ca41474775.57a7e879592f8.gif)

- This feature is achieved using a **media query**, through which specific styles can be defined for a particular resolution

```css
/* General styles for large screens */
.element {
  width: 70%;
}

/* Specific styles for smaller screens (e.g., tablets and phones) */
@media screen and (max-width: 600px) {
  .element {
    width: 100%;
  }
}
```

- Additionally, **flex** and **grid**, which we discussed in previous sections, are useful for adjusting element alignment based on screen size

- Other helpful elements for this purpose can be:
  - using **relative units** ([%, vh, em, rem](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units))
  - using **maximum or minimum dimensions** (max-width, min-width)

## 4. Using External Styles

- Besides styling defined in local files using explicit CSS properties, there's also the possibility of **importing style libraries**

- Using a library helps developers to use classes defined there to apply certain styling rules

- The most popular styling libraries are:
  - [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
  - [Material UI](https://www.muicss.com/)
  - [Tailwind CSS](https://tailwindcss.com/)

- These libraries are useful because they reduce the complexity of defining basic styles and ensure consistency and uniformity between elements used in different areas of the page

## 5. Implementing a Layout

- Starting from the current form of the action! application, we'll follow the layout described in [this design document](https://www.figma.com/proto/RpA5XFlyajxjeIeAm3dYDv/action!?type=design&node-id=4-38&t=7m48v8nwdQNsk8KY-0&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=4%3A38) (called a _mock-up_) and style the existing elements

![Mockup](./assets/mockup.png)

- We start by modifying the application structure, i.e., the index.html file, changing the tags to reflect the elements from the mock-up

<details>
  <summary>index.html</summary>

  ```html
  <html>
    <head>
      <title>action!</title>
      <!-- including the locally defined style from the style.css file -->
      <link rel="stylesheet" href="style.css" />
    </head>
    <body>
      <!-- native dialog element used to define a modal window that will only be visible when activated -->
      <!-- by default, a dialog element will have absolute positioning, being outside the normal display flow -->
      <!-- for this reason, as long as it's defined in the same parent, the modal can be placed anywhere -->
      <dialog id="addMovieModal" class="modal" onkeydown="onModalKeyPress(event)">
        <!-- modal content -->
        <div class="modal-content">
          <div class="modal-header">
            <h2>Add movie</h2>
            <!-- button that will call, on click, a method that will hide the modal -->
            <span class="modal-close" onclick="closeModal()">&times;</span>
          </div>
          <!-- form for entering a new movie -->
          <form id="addMovieForm" class="create-form">
            <!-- defining labels associated with inputs -->
            <label for="title">Title:</label>
            <!-- attaching classes to style all selected components -->
            <!-- using the required attribute to prevent incomplete form submission -->
            <input
              class="custom-text-input"
              type="text"
              id="title"
              name="title"
              required
            /><br />

            <label for="year">Year:</label>
            <input
              class="custom-text-input"
              type="number"
              id="year"
              name="year"
              required
            /><br />

            <label for="director">Director:</label>
            <input
              class="custom-text-input"
              type="text"
              id="director"
              name="director"
              required
            /><br />

            <label for="genre">Genre:</label>
            <input
              class="custom-text-input"
              type="text"
              id="genre"
              name="genre"
              required
            /><br />

            <label for="synopsis">Synopsis:</label>
            <textarea
              class="custom-text-input"
              id="synopsis"
              name="synopsis"
              required
            ></textarea
            ><br />

            <label for="duration">Duration (minutes):</label>
            <input
              class="custom-text-input"
              type="number"
              id="duration"
              name="duration"
              required
            /><br />

            <label for="poster">Poster URL:</label>
            <input
              class="custom-text-input"
              type="url"
              id="poster"
              name="poster"
              required
            /><br />

            <!-- when the form submit button is pressed, the addMovie method is called -->
            <button type="submit" class="custom-button">Save</button>
          </form>
        </div>
      </dialog>
      <!-- page header that will include the application name -->
      <div class="header">
        <div class="app-title">action!</div>
      </div>
      <div class="container">
        <h3>All movies</h3>
        <!-- toolbar with functional elements -->
        <div class="toolbar">
          <!-- input used to search movies by title -->
          <input
            id="search"
            class="searchbar custom-text-input"
            type="text"
            placeholder="Search for a movie"
          />
          <!-- button that will call the method that loads movies based on the title entered in the searchbar -->
          <button class="custom-button" onclick="searchMovie()">Search</button>
          <!-- button that will open the modal for adding a new movie -->
          <button class="custom-button" onclick="openModal()">Add a movie</button>
        </div>
        <!-- container where movies will be displayed as they are loaded, being empty at page load -->
        <div id="moviesContainer"></div>
      </div>
    </body>
    <!-- including the locally defined main.js script -->
    <script src="main.js"></script>
  </html>
  ```
</details>

- Subsequently, we'll modify the CSS part to style both new and existing elements

<details>
  <summary>style.css</summary>

  ```css
  /* configuring the body element */
  body {
    /* since the dialog element is positioned as absolute by default, we also need to position the parent to be able to position the modal relative to the body */
    position: relative;
    /* removing default margins and padding */
    margin: 0;
    padding: 0;
    /* applying a background color */
    /* using a color in hex format */
    background-color: #ceeaf7;
    /* the body height must cover the entire page, without margins or paddings, to make the modal, positioned absolutely relative to the body, to also occupy the full page height */
  }

  .header {
    background-color: #201335;
    height: 60px;
    color: white;
    /* using a flex container that ensures automatic header resizing */
    display: flex;
    align-items: center;
    /* sticky positioning makes the header stay visible when scrolling */
    position: sticky;
    top: 0;
    /* styling the padding on the left side of the element */
    padding-left: 20px;
  }

  .app-title {
    /* styling the font size and weight */
    font-weight: bold;
    font-size: 32px;
  }

  .container {
    /* classic method for horizontally centering an element within another element */
    margin: 0 auto;
    width: 80%;
  }

  .toolbar {
    margin: 20px 0;
    display: flex;
    /* spacing between elements in a flexbox */
    gap: 10px;
  }

  /* elements with the searchbar class will occupy all remaining space in a flex container after adjacent elements are displayed */
  .searchbar {
    flex: 1;
  }

  .movie-container {
    /* styling the element's border */
    border: 1px solid black;
    padding: 10px;
    margin: 10px auto;
    background-color: white;
    border-radius: 20px;
    display: flex;
  }

  .movie-info-container {
    padding: 20px;
    display: flex;
    /* vertical ordering of elements in a flexbox */
    flex-direction: column;
    gap: 10px;
    flex: 1;
  }

  .movie-header {
    display: flex;
  }

  /* using the first-child pseudo-class that will select, as the name suggests, the first child of the current element */
  .movie-header :first-child {
    flex: 1;
  }

  .movie-specs {
    font-style: italic;
  }

  .movie-synopsis {
    padding: 20px;
    border: 1px solid black;
    background-color: #ffb17a;
    /* rounding the corners of an element's border */
    border-radius: 20px;
  }

  .poster-container {
    /* setting the maximum height an element can have */
    max-height: 200px;
  }

  .custom-text-input {
    padding: 5px 10px;
    border-radius: 20px;
    border: 1px solid black;
  }

  .custom-button {
    padding: 5px;
    border-radius: 20px;
    font-weight: bold;
    background-color: #ffb17a;
    /* displaying and styling an element's shadow */
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border: 1px solid black;
    cursor: pointer;
  }

  .remove-btn {
    height: 40px;
    padding: 3px 10px;
    border-radius: 20px;
    font-weight: bold;
    background-color: #b31515;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    border: 1px solid black;
    /* styling the cursor */
    cursor: pointer;
    /* styling the font color */
    color: white;
  }

  /* Modal styling */
  .modal {
    /* covering the entire available space from the parent */
    width: 100%;
    height: 100%;
    /* using a background color, along with a transparency coefficient */
    background-color: rgba(0, 0, 0, 0.4);
    /* positioning the element absolutely at the beginning of the page */
  }

  .modal-content {
    background-color: #fff;
    margin: 5% auto;
    padding: 20px;
    border: 1px solid #000;
    border-radius: 20px;
    width: 50%;
  }

  .modal-header {
    display: flex;
  }

  .modal-header h2 {
    flex: 1;
  }

  .modal-close {
    cursor: pointer;
  }

  .create-form {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
  }

  .create-form textarea {
    resize: vertical;
  }
  ```
</details>

- Finally, we'll update the dynamic features to integrate the new page behavior and support the new requests made to the back-end

<details>
  <summary>main.js</summary>
  
  ```js
  // attaching a handler that will call the loadMovies method when the page is loaded
  window.onload = () => loadMovies();

  // attaching a handler that will call the addMovie method when the "addMovieForm" form intercepts the submit event
  // browsers define standard behavior for certain events, such as the submit event, like executing an automatic call and reloading the page
  // since in this example the call implementation is done separately, $event.preventDefault() will stop the browser from executing the standard behavior
  document.getElementById("addMovieForm").addEventListener("submit", ($event) => {
    $event.preventDefault();
    addMovie();
  });

  // method for loading movies that can receive a title as a parameter
  // if a title is received, a URLSearchParams object is constructed used for attaching query parameters to the URL used in the call
  // if no title is received, then the call will return all movies
  function loadMovies(title) {
    const queryParams = new URLSearchParams();

    if (!!title) {
      queryParams.append("title", title);
    }

    // using fetch to make the call to the back-end
    fetch("http://localhost:8080/api/v1/movies?" + queryParams)
      .then((response) => response.json())
      .then((data) => data.records)
      .then((movies) => {
        const moviesList = document.getElementById("moviesContainer");
        // modifying the HTML content of an element
        moviesList.innerHTML = "";

        // for each movie, HTML elements that need to be displayed are dynamically constructed
        movies.forEach((movie) => {
          const movieItem = document.createElement("div");
          // applying a style to a component
          movieItem.classList.add("movie-container");

          const movieInfoContainer = document.createElement("div");
          movieInfoContainer.classList.add("movie-info-container");

          const movieHeader = document.createElement("div");
          movieHeader.classList.add("movie-header");

          const movieTitle = document.createElement("h4");
          // modifying the text content of an element
          movieTitle.innerText = `${movie.title} (${movie.year})`;

          const movieDeleteBtn = document.createElement("button");
          movieDeleteBtn.classList.add("remove-btn");
          movieDeleteBtn.innerText = "X";
          // adding an event handler for 'click' events
          movieDeleteBtn.addEventListener("click", () => removeMovie(movie));

          const movieSpecs = document.createElement("div");
          movieSpecs.classList.add("movie-specs");
          movieSpecs.innerText = `${movie.genre} • ${movie.duration} minutes • ${movie.director}`;

          movieHeader.appendChild(movieTitle);
          movieHeader.appendChild(movieDeleteBtn);

          const movieSynopsis = document.createElement("div");
          movieSynopsis.classList.add("movie-synopsis");
          movieSynopsis.innerText = movie.synopsis;

          movieInfoContainer.appendChild(movieHeader);
          movieInfoContainer.appendChild(movieSpecs);
          movieInfoContainer.appendChild(movieSynopsis);

          const moviePoster = document.createElement("img");
          // setting an attribute
          moviePoster.setAttribute("src", movie.poster);
          moviePoster.classList.add("poster-container");

          // attaching elements to an element that will become a parent (or container)
          movieItem.appendChild(moviePoster);
          movieItem.appendChild(movieInfoContainer);

          moviesList.appendChild(movieItem);
        });
      });
  }

  // method for deleting a movie
  function removeMovie(movie) {
    fetch(`http://localhost:8080/api/v1/movies/${movie.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        loadMovies();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // method for searching for a movie that will use the value entered in the search input
  // and will call the loadMovies method defined earlier
  function searchMovie() {
    const title = document.getElementById("search").value;
    loadMovies(title);
  }

  // method for adding a movie
  function addMovie() {
    // extracting data entered in the form and creating an object that will be sent to the back-end
    const formData = {
      title: document.getElementById("title").value,
      year: parseInt(document.getElementById("year").value),
      director: document.getElementById("director").value,
      genre: document.getElementById("genre").value,
      synopsis: document.getElementById("synopsis").value,
      duration: parseInt(document.getElementById("duration").value),
      poster: document.getElementById("poster").value,
    };

    fetch("http://localhost:8080/api/v1/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(() => {
        // clearing data entered in the form after successfully adding a movie
        document.getElementById("addMovieForm").reset();
        // reloading the displayed movies
        loadMovies();
        // closing the movie addition modal
        closeModal();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // method for displaying the modal
  function openModal() {
    document.getElementById("addMovieModal").show();
  }

  // method for hiding the modal
  function closeModal() {
    document.getElementById("addMovieModal").close();
  }
  ```
</details>


## 6. Individual Work

- Using a similar approach to the one defined above, try styling the other 2 pages of the application so that, viewed together, all 3 pages have a uniform appearance

