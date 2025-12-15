# React

## Table of contents

1. [React 101](#1-react-101)
   1. [Components - definition, state and props](#11-components---definition-state-and-props)
   2. [Defining a component](#12-defining-a-component)
   3. [The Virtual DOM](#13-the-virtual-dom)
   4. [Component lifecycle](#14-component-lifecycle)
   5. [Hooks](#15-hooks)

2. [Rewriting the UI using React](#2-rewriting-the-ui-using-react)

3. [Individual work](#3-individual-work)
   1. [Editing a record](#31-editing-a-record)
   2. [Rewriting the Collection and Person pages](#32-rewriting-the-collection-and-person-pages)

## 1. React 101

- **React** is an [open-source](https://github.com/facebook/react) JavaScript library based on components, used to streamline the process of building user interfaces

- React was initially developed by _Facebook_ and released in _2013_

- At the core of components lies the **JSX** (_JavaScript XML_) format, which describes the structure of a user interface through HTML tags integrated within JavaScript files, thus noticeably changing the way front-end applications are developed

- For this reason, unlike using plain JavaScript files (also called Vanilla JavaScript), React applications go through an additional compilation step that produces a single main JavaScript file containing all the defined components
  - This aspect applies to many other JavaScript frameworks specialized in client interfaces (Angular, Vue, etc.)

- One of the most important advantages offered by React is the ability to develop applications using the concept of _components_

- [Recommendation: React in 100 seconds](https://www.youtube.com/watch?v=Tn6-PIqc4UM)

### 1.1 Components - definition, state and props

- A React component represents a **reusable piece of code** that defines an individual UI element isolated from other parts of the application

- Using components enables **code modularization**, which facilitates the development, testing, and maintenance of applications

- By defining multiple components, developers can create distinct layouts by combining them in various ways and can modify subsections of the application without these changes affecting other areas

![React Components](https://www.patterns.dev/img/reactjs/react-components@1.5x.svg)

- Each component consists of its structure, _state_, and corresponding logic, to which, in some cases, specific styling imported from external files is added

- For **managing and transmitting data between components**, 2 fundamental concepts are used - **state** and **props**
  - **state** defines the _internal state_ of a component
    - it is _mutable_
  - **props** are arguments received by a component from outside
    - they are _immutable_

![state vs props](https://user-images.githubusercontent.com/53526987/128488979-715bfac0-cc28-484f-a0df-bf847f03263d.PNG)

### 1.2 Defining a component

- Defining a component can be done in 2 ways:
  - using classes - _Class-based components_ (_deprecated_ approach - no longer recommended)
    - the _Component_ class from the React library is extended
    - the class contains a constructor that receives props and initializes the component's state
    - each component has a _render_ method within which the content to be displayed is defined

    ```js
    import React, { Component } from "react";

    class MyComponent extends Component {
      constructor(props) {
        super(props);
        this.state = {
          // Component state
        };
      }

      render() {
        // Component rendering logic
      }
    }
    ```

  - using functions - _Functional components_ (recommended approach)
    - the _render_ method from Class-based components is equivalent in this case to what the function returns
    - the component's state is replicated using the _useState_ hook (which we'll discuss in the following sections)
    - **importing the context** from the React library is necessary for the file to be interpreted as a React component and not a normal function
    ```js
    function MyComponent(props) {
      // Component rendering logic
    }
    ```

- Components define the structure and logic of subsections in the UI, but how they are displayed and subsequently updated is closely related to another fundamental concept of the React library: the _Virtual DOM_

### 1.3 The Virtual DOM

- The **Virtual DOM** is **a representation of the UI stored in memory as a tree** and **synchronized** with the "real" DOM through a process called **reconciliation**

![Virtual DOM](https://www.syncfusion.com/blogs/wp-content/uploads/2023/07/Virtual-DOM-identifying-changes-to-apply-to-the-Original-DOM.png)

- Essentially, the mechanism works based on a simple algorithm:
  - a React component is displayed on the page
  - an element in its state or props changes
  - to reflect the new state, the component is modified in the virtual DOM
  - React compares the virtual DOM with the browser's DOM, which is actually the previous state of the virtual DOM, and updates _only_ those nodes that have been modified (reconciliation)

- Therefore, using the virtual DOM results in:
  - **Improved performance**
    - DOM manipulations are expensive, and updating the entire DOM (as is the case when using Vanilla JavaScript) with every change can lead to poor performance
    - Using a Virtual DOM helps React minimize and optimize the updates of the real DOM

  - **Efficiency**
    - React can efficiently render components and update only the necessary parts of the interface, without affecting other parts of the application

  - **Simplified manipulation of structural elements**
    - Programmers can work with a declarative model, which focuses on what should be displayed, instead of directly manipulating the DOM
      - We recall the previous lab where we had to create a new element in JavaScript that we subsequently had to manually insert into the page's DOM

- Throughout the application's usage, as a result of updating the displayed data, a component goes through multiple re-renders that are part of a component's _lifecycle_

### 1.4 Component lifecycle

- The **lifecycle** of a React component describes the stages a component goes through from the moment of its creation until its removal from the DOM

- It's a concept closely related to the class-based React approach, through the existence of so-called _lifecycle methods_ that schedule the execution of custom actions at a specific moment

- The main stages of the lifecycle within a component are:
  - **Mounting**
    - the component is created and inserted into the DOM

  - **Updating**
    - the component's state or props change

  - **Unmounting**
    - the component is removed from the DOM

- Each stage has associated _lifecycle methods_ that execute when the component is in that stage:
  ![Lifecycle Methods](https://miro.medium.com/v2/resize:fit:1400/1*6X_7HKFdQoh9eXqWgwQuvQ.png)

- Within functional React components, however, the lifecycle is simplified through the usage of predefined hooks

### 1.5 Hooks

- **Hooks** are **functions**, introduced with React version _16.8_, that **replace**, among other things, **the method-based configurations used in class-based components** (_state, lifecycle methods_)
  ![Lifecycle methods as hooks](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*bsk4y_rRxmX_Qtol3H3caw.png)

- The most important hooks we'll use are _useState_ and _useEffect_
  - **useState**
    - helps functional components to store and manage local state
    - it's always defined through the tuple _[variableName, setVariableName]_

    ```js
    import { useState } from "react";

    function ExampleComponent() {
      // the count variable from the component's state
      // the variable's value is changed using the setCount method
      const [count, setCount] = useState(0);

      return (
        <div>
          <p>You clicked {count} times</p>
          <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
      );
    }
    ```

  - **useEffect**
    - helps performing actions at certain moments in the component's lifecycle
    - receives **2 parameters**:
      - a callback
      - a dependency array (variables - state or props - that will be monitored, and based on their changes, the callback will be called)

    ```js
    import React, { useState, useEffect } from "react";

    function ExampleComponent() {
      const [data, setData] = useState(null);

      useEffect(() => {
        // method that executes after rendering
        fetchData();

        // optional
        // the callback returned from the useEffect method will be called when the component
        // is removed from the screen (unmounted), as long as we pass an empty array as the second argument
        return () => {
          console.log("clean up the component");
        };
      }, []); // empty dependency array means what's defined in the callback executes only on mount

      useEffect(() => {
        // method that executes after rendering, every time an update occurs
        fetchData();

        // optional
        // the callback returned from the useEffect method will be called when
        // an update occurs at the component level, before re-rendering
        return () => {
          console.log("clean up the component");
        };
      });

      useEffect(() => {
        // method that executes after rendering, every time the data variable changes
        fetchData();
      }, [data]);

      const fetchData = async () => {
        const result = await fetchDataFromAPI();
        setData(result);
      };

      return (
        <div>
          // conditional rendering based on whether a value is assigned to the
          data variable
          {data ? <p>Data loaded : {data}</p> : <p>Loading...</p>}
        </div>
      );
    }
    ```

    - there are 3 cases, depending on the values that can be used for the dependency array
      - **empty dependency array**
        - the callback is called _only when the component is mounted in the DOM_
        - equivalent to the _componentDidMount_ lifecycle method from the class-based approach

      - **dependency array with values**
        - the callback is called _with every change of any value in the dependency array_
        - equivalent to the _componentDidUpdate_ method from the class-based approach

      - **dependency array omitted**
        - the callback is called _with every re-render of the component_

- React provides to developers many predefined hooks, as well as a mechanism for defining [custom hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)

- During the lab, we'll focus on the hooks mentioned above, but it's recommended to read about other hooks and, if needed, use them in the project
  - [Recommendation: (More) Advanced Hooks](https://medium.com/in-the-weeds/an-intro-to-advanced-react-hooks-a8af6397fe28)

## 2. Rewriting the UI using React

### 2.1 Initializing React using Vite

- To be able to use the React library (and because the _create-react-app_ utility [is no longer maintained](https://dev.to/ag2byte/create-react-app-is-officially-dead-h7o)), we'll create a boilerplate project using _Vite_, a modern tool for web application development
  - It should be mentioned that to develop a React application, a Node.js environment is needed to manage build processes

  ```sh
  npm create vite@latest front-end-react -- --template react
  ```

- Later, the existing _fe_ directory will be deleted, but for now, we'll keep it to be able to transfer and transform the existing code

- The utility will create a basic directory structure that we'll update later and will add default configurations for building the application (present in the _vite.config.js_ and _eslint.config.js_ files)

- Then, according to the instructions displayed in the console, we can start the newly created application (after installing dependencies)

  ```sh
  cd front-end-react
  npm install
  npm run dev
  ```

- The application can be viewed by accessing the address mentioned in the console: _http://localhost:5173_ (the default port is 5173)
  ![React app running](./assets/react_vite.png)

- Regarding the directory structure, the main directories and files can be observed:
  - the **public** directory
    - contains _static files_ that won't be processed but will be copied to the final directory when building the project
  - the **index.html** file
    - basic template for the main page of your React application
    - here you can modify the title, add meta information, or include other static resources
  - the **src** directory
    - contains the _source code of the React application_
  - the **src/assets** directory
    - contains _static files_ that will be processed along with the source code
  - the **src/main.jsx** file
    - entry point into the React application
    - here the main component `(<App />)` is imported and rendered in the element with the id "root" from the index.html file
  - the **src/index.css** file
    - contains global styles, used throughout the entire application
  - the **src/App.jsx** file
    - the main component of the application
  - the **src/App.css** file
    - styling associated with the main component of the application
  - the **package.json** file
    - contains information about the project, its dependencies, build and run scripts, as well as other configurations

- Similar to the directory structure in the back-end application, we'll structure components by their type

- To start, we define two main directories - **pages** and **components**
  - pages will contain the layout of a page in the application
  - components will contain reusable components, integrated into one or more pages

  ```
  src/
      ├── pages/
      |   └── Movies
      │       └── index.jsx
      │       └── style.css
      ├── components/
      │   └── MovieCard
      │       └── index.jsx
      │       └── style.css
      │   └── CreateMovieModal
      │       └── index.jsx
      │       └── style.css
      |   └── Searchbar
      │       └── index.jsx
      │       └── style.css
      └── ... // can contain services, util functions etc.
  ```

- Each component will contain all the logic necessary for its correct display and will be composed, initially, of two files _index.js_ and _style.css_

- We'll modify the content of the _App.js_ file to display the _Movies.jsx page_

  ```js
  import { Movies } from "./pages/Movies";
  import "./App.css";

  function App() {
    return (
      <div className="App">
        <div className="header">
          <div className="app-title">action!</div>
        </div>
        <Movies />
      </div>
    );
  }

  export default App;
  ```

- The first step is to add the page layout where we'll display the movies:
  - pages/Movies/index.jsx

  ```jsx
  import React, { useState, useEffect } from "react";

  import { MovieCard } from "../../components/MovieCard";

  import "./style.css";
  import { CreateMovieModal } from "../../components/CreateMovieModal";
  import { Searchbar } from "../../components/Searchbar";

  const SERVER_URL = "http://localhost:8080/api/v1";

  const Movies = () => {
    // declare a state variable to store the movies - initially an empty array
    const [movies, setMovies] = useState([]);
    // declare a state variable to determine whether to display the modal or not
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getMovies = (queryTitle) => {
      const queryParams = new URLSearchParams();

      if (!!queryTitle) {
        queryParams.append("title", queryTitle);
      }

      // call the method exposed by the backend to fetch movies and set them in state
      fetch(`${SERVER_URL}/movies?` + queryParams)
        .then((res) => res.json())
        .then((data) => setMovies(data.records));
    };

    const addMovie = (movie) => {
      fetch(`${SERVER_URL}/movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      })
        .then((res) => getMovies())
        .catch((err) => console.log(err));
    };

    const deleteMovie = (movie) => {
      fetch(`${SERVER_URL}/movies/${movie.id}`, { method: "DELETE" })
        .then((res) => getMovies())
        .catch((err) => console.log(err));
    };

    useEffect(() => {
      // when the page is added to the DOM
      // fetch data from the backend
      getMovies();
    }, []);

    const openModal = () => {
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    return (
      <div>
        <div className="container">
          <h3>All movies</h3>
          <Searchbar openModal={openModal} getMovies={getMovies} />
          <div id="moviesContainer">
            {/* JSX syntax, for each movie in the list a MovieCard component is displayed */}
            {movies.map((movie, index) => (
              <MovieCard movie={movie} key={index} onDelete={deleteMovie} />
            ))}
          </div>
        </div>
        {/* conditional rendering */}
        {isModalOpen && (
          <CreateMovieModal onAddMovie={addMovie} closeModal={closeModal} />
        )}
      </div>
    );
  };

  export { Movies };
  ```

- Next, we'll add a component for each important section of the page:
  - components/Searchbar/index.jsx

  ```jsx
  import React, { useState } from "react";

  import "./style.css";

  // receiving methods from parent that will be called from child
  const Searchbar = ({ openModal, getMovies }) => {
    // declare a state variable to store the movie title searched by the user
    const [queryTitle, setQueryTitle] = useState(null);

    const onChangeQueryTitle = (event) => {
      // get the value entered by the user for the searched movie
      const searchedMovieTitle = event.target.value;
      // set the value in state
      setQueryTitle(searchedMovieTitle);
    };

    return (
      <div className="toolbar">
        <input
          onChange={onChangeQueryTitle}
          id="search"
          className="searchbar custom-text-input"
          type="text"
          placeholder="Search for a movie"
        />
        <button className="custom-button" onClick={() => getMovies(queryTitle)}>
          Search
        </button>
        <button className="custom-button" onClick={() => openModal()}>
          Add a movie
        </button>
      </div>
    );
  };

  export { Searchbar };
  ```

  - components/MovieCard/index.jsx

  ```jsx
  import "./style.css";

  // MovieCard component receives a prop called movie - the object describing a film
  // an onDelete function that will be called when deleting an element is desired
  const MovieCard = ({ movie, onDelete }) => {
    return (
      <div className="movie-container">
        <img alt="movie-img" className="poster-container" src={movie.poster} />
        <div className="movie-info-container">
          <div className="movie-header">
            <h4 className="movieTitle">
              {/* JSX syntax */}
              {`${movie.title} (${movie.year})`}
            </h4>
            {/* on click calls the delete function received through props and sends the movie as parameter */}
            <button className="remove-btn" onClick={() => onDelete(movie)}>
              X
            </button>
          </div>
          <div className="movie-specs">
            {`${movie.genre} • ${movie.duration} minutes • ${movie.director}`}
          </div>
          <div className="movie-synopsis">{movie.synopsis}</div>
        </div>
      </div>
    );
  };

  export { MovieCard };
  ```

  - components/CreateMovieModal/index.jsx

  ```jsx
  import { useState } from "react";

  import "./style.css";

  const CreateMovieModal = ({ onAddMovie, closeModal }) => {
    // add to state all the fields that will be filled in
    const [title, setTitle] = useState("");
    const [year, setYear] = useState(0);
    const [director, setDirector] = useState("");
    const [genre, setGenre] = useState("");
    const [synopsis, setSynopsis] = useState("");
    const [duration, setDuration] = useState(0);
    const [poster, setPoster] = useState("");

    // define callbacks for onChange events for all inputs
    const onChangeTitle = (event) => {
      setTitle(event.target.value);
    };

    const onChangeYear = (event) => {
      setYear(event.target.value);
    };

    const onChangeGenre = (event) => {
      setGenre(event.target.value);
    };

    const onChangeSynopsis = (event) => {
      setSynopsis(event.target.value);
    };

    const onChangeDirector = (event) => {
      setDirector(event.target.value);
    };

    const onChangeDuration = (event) => {
      setDuration(event.target.value);
    };

    const onChangePoster = (event) => {
      setPoster(event.target.value);
    };

    const saveMovie = (event) => {
      // prevent default form submission -> page refresh
      event.preventDefault();
      // pass to the save function the movie object built by filling in the form
      onAddMovie({ title, year, director, genre, synopsis, duration, poster });
      closeModal();
    };

    return (
      <dialog id="CreateMovieModal" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Add movie</h2>
            <span className="modal-close" onClick={closeModal}>
              &times;
            </span>
          </div>
          <form id="addMovieForm" className="create-form">
            <label htmlFor="title">Title:</label>
            <input
              onChange={onChangeTitle}
              className="custom-text-input"
              type="text"
              id="title"
              name="title"
              required
            />
            <br />

            <label htmlFor="year">Year:</label>
            <input
              onChange={onChangeYear}
              className="custom-text-input"
              type="number"
              id="year"
              name="year"
              required
            />
            <br />

            <label htmlFor="director">Director:</label>
            <input
              onChange={onChangeDirector}
              className="custom-text-input"
              type="text"
              id="director"
              name="director"
              required
            />
            <br />

            <label htmlFor="genre">Genre:</label>
            <input
              onChange={onChangeGenre}
              className="custom-text-input"
              type="text"
              id="genre"
              name="genre"
              required
            />
            <br />

            <label htmlFor="synopsis">Synopsis:</label>
            <textarea
              onChange={onChangeSynopsis}
              className="custom-text-input"
              id="synopsis"
              name="synopsis"
              required
            ></textarea>
            <br />

            <label htmlFor="duration">Duration (minutes):</label>
            <input
              onChange={onChangeDuration}
              className="custom-text-input"
              type="number"
              id="duration"
              name="duration"
              required
            />
            <br />

            <label htmlFor="poster">Poster URL:</label>
            <input
              onChange={onChangePoster}
              className="custom-text-input"
              type="url"
              id="poster"
              name="poster"
              required
            />
            <br />

            <button className="custom-button" onClick={saveMovie}>
              Save
            </button>
          </form>
        </div>
      </dialog>
    );
  };

  export { CreateMovieModal };
  ```

- Then, using the styles defined in the previous lab, we'll move certain style definitions into the components where they need to be applied:
  - index.css (global styles)

  ```css
  /* configuring the body element */
  body {
    /* since the dialog element is positioned absolute by default, we need to position the parent as well to be able to position the modal relative to body */
    position: relative;
    /* removing default margins and padding */
    margin: 0;
    padding: 0;
    /* applying a background color */
    /* using a color in hex format */
    background-color: #ceeaf7;
    /* body height must cover the entire page, to make the modal, positioned absolutely relative to body, occupy the entire height of the page */
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
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border: 1px solid black;
    /* styling the cursor */
    cursor: pointer;
    /* styling the font color */
    color: white;
  }
  ```

  - App.css (styles for the main component)

  ```css
  .header {
    background-color: #201335;
    height: 60px;
    color: white;
    /* using a flex container that ensures automatic resizing of the header */
    display: flex;
    align-items: center;
    /* styling the padding on the left side of the element */
    padding-left: 20px;
  }

  .app-title {
    /* styling the size and style of the font used */
    font-weight: bold;
    font-size: 16px;
  }
  ```

  - pages/Movies/style.css

  ```css
  .movie-container {
    /* styling an element's border */
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
    width: 100%;
  }

  .movie-header {
    display: flex;
    gap: 10px;
  }

  /* using the first-child pseudo-class which will select, as the name suggests, the first child of the current element */
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

  .edit-movie-form {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .movie-tool-btn {
    height: 40px;
  }
  ```

  - components/Searchbar/style.css

  ```css
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
  ```

  - components/MovieCard/style.css

  ```css
  .movie-container {
    /* styling an element's border */
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
    width: 100%;
  }

  .movie-header {
    display: flex;
    gap: 10px;
  }

  /* using the first-child pseudo-class which will select, as the name suggests, the first child of the current element */
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

  .edit-movie-form {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .movie-tool-btn {
    height: 40px;
  }
  ```

  - components/CreateMovieModal/style.css

  ```css
  /* Styling the modal */
  .modal {
    /* the default positioning of the modal is absolute, so it can be placed at the beginning of the parent */
    top: 0;
    /* covering the entire available space from the parent */
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0px;
    /* using a background color, together with a transparency coefficient */
    background-color: rgba(0, 0, 0, 0.4);
    /* positioning the element absolutely at the beginning of the page */
    display: block;
  }

  .modal-content {
    background-color: #fff;
    margin: 15% auto;
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
  ```

## 3. Individual work

### 3.1 Editing a record

- Besides the ability to add, delete, and search for movies, a real application should allow the user to modify already existing records

- Using all the concepts we've discussed so far, try to implement the functionality for editing a movie displayed in the list

- How you integrate this functionality into the existing UI is your choice
  - You can opt for a modal window or for in-place editing - there are no restrictions

### 3.2 Rewriting the Collection and Person pages

- Afterwards, to practice developing React components, try to rewrite the pages associated with the Collection and Person entities
