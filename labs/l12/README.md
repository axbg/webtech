# React Router & Redux

## Table of contents

1. [React Router](#1-react-router)
   1. [Traditional Routing vs Client-Side Routing](#11-traditional-routing-vs-client-side-routing)
   2. [React Router](#12-react-router)

2. [Defining Routes](#2-defining-routes)

3. [Managing Global State](#3-managing-global-state)
   1. [Prop Drilling](#31-prop-drilling)
   2. [Redux](#32-redux)

4. [Using Redux](#4-using-redux)

5. [Individual work](#5-individual-work)

## 1. React Router

### 1.1 Traditional Routing vs. Client-Side Routing

- Most websites and web applications consist of multiple pages that present various functionalities

- When loading a traditional website, the browser requests and downloads a page containing HTML, CSS, and JavaScript from a web server, displaying the elements after loading all the content

- When a user navigates to another page on the same site, the entire process repeats

- The association of a route with a particular page of a website is called **routing**

- In modern applications, routing is typically performed on the client side, i.e., in the browser, without re-rendering an HTML document from scratch, which enables optimized loading of information on the page in a faster and more dynamic way

- An application that uses such routing is called a **Single Page Application (SPA)**, because it interacts with the user by dynamically rewriting the current page with updated data, as opposed to the default method of completely reloading the page

![traditional vs spa app](https://www.digitalclaritygroup.com/wp-content/uploads/2017/10/SPA-1.png)

### 1.2 React Router

- Being a library used for building user interfaces, React doesn't provide a built-in solution for route management

- **React Router** is a library for React that provides routing capabilities

- It helps manage and synchronize navigation in React applications so that, depending on the current route, specific components can be displayed

- React Router offers developers several components for implementing the routing mechanism:
  - **Router**
    - the component that handles synchronization between the URL and the displayed content
    - there are 3 types of routers that can be used:
      - _BrowserRouter_
        - uses the History API to synchronize the browser's URL address and the application state
        - implements navigation between pages (forward/backward) using the browser's built-in history
        - **the recommended option**

      - _HashRouter_
        - useful when the web server cannot be configured
        - instead of using a normal URL, it will use the portion of the URL after the hash (#) to control the displayed content

      - _MemoryRouter_
        - instead of using the browser's history, it keeps track of visited pages in-memory
        - mainly useful for testing, but can also be used in non-browser environments

  - **Route**
    - the basic component used to associate a React component with a particular route
    - when the route matches, the associated component is displayed

  - **Routes**
    - the component that groups routes and ensures that elements are displayed correctly for a given URL
    - in older versions (up to v6 - the current version), this component was called _Switch_ and had fewer features

  - **Link**
    - the component that links pages in React applications
    - generates links that update the URL without causing a page reload

- A simple example of defining a router in the main component of a React application (_App.js_):

```js
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Home } from "./Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
```

## 2. Defining Routes

- In the action! application, there are 3 distinct entities: Movies, Collections, and Persons

- For each of these, we can define a route that displays the correct page

- The first step is to install the React Router library

  ```sh
  npm install --save react-router
  ```

- Next, we'll create a _Home_ page to be displayed on the main route **(/)**, serving as the landing page
  - _src/pages/Home/index.jsx_

  ```js
  import { useNavigate } from "react-router";
  import "./style.css";

  const Home = () => {
    // hook for navigating to a desired page
    const navigate = useNavigate();

    return (
      <div className="home">
        <h1>Explore movies</h1>
        <button className="custom-button" onClick={() => navigate("/movies")}>
          Start now
        </button>
      </div>
    );
  };

  export { Home };
  ```

  - _src/pages/Home/style.css_

  ```css
  .home {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  ```

- For cases where the route is not found, we define a _Not found_ page
  - _src/pages/NotFound/index.jsx_

  ```js
  const NotFound = () => {
    return <h1>Page not found.</h1>;
  };

  export { NotFound };
  ```

- At the application level, we'll configure a router:
  - the main route _/_ will display the _Home_ page
  - the _/movies_ route will display the Movies page
  - any other route will display the _NotFound_ page

- Router configuration will be done in the root component of the application
  - src/App.jsx

  ```js
  import { BrowserRouter as Router, Routes, Route } from "react-router";
  import { Movies } from "./pages/Movies";
  import { Home } from "./pages/Home";
  import { NotFound } from "./pages/NotFound";
  import "./App.css";

  function App() {
    return (
      <div className="App">
        <div class="header">
          <div class="app-title">action!</div>
        </div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    );
  }

  export default App;
  ```

- Beyond routing, which is most often managed globally, there may be contexts where synchronizing data across multiple components is necessary, acting like a global application state

## 3. Managing Global State

### 3.1 Prop Drilling

- Analyzing the following component hierarchy:

```js
// Component A
function ComponentA({ data, onDataUpdate }) {
  // ...
  return <ComponentB data={data} onDataUpdate={onDataUpdate} />;
}

// Component B
function ComponentB({ data, onDataUpdate }) {
  // ...
  return <ComponentC data={data} onDataUpdate={onDataUpdate} />;
}

// Component C
function ComponentC({ data, onDataUpdate }) {
  // Uses or displays data
  return (
    <div>
      {data}
      <button onClick={() => onDataUpdate("Updated data")}>Update Data</button>
    </div>
  );
}
```

- We observe that, although it receives the _data_ and _onDataUpdate_ elements as props, Component A doesn't use them directly but passes them forward to Component B

- Similarly, Component B, without using these values, passes them forward to Component C

- This intermediate, often redundant, passing of information to reach the component in the hierarchy for which the information is relevant is called **"prop drilling"**

![prop drilling](https://miro.medium.com/v2/resize:fit:1256/0*ioNTCLVXxOEyed9U)

- Problems can arise in the context of a deep component hierarchy when data needs to be passed through many levels, which can make the entire application harder to maintain and understand

- To solve these situations, the most popular method is using a global state management mechanism, such as Redux or React Context

- In this lab, we'll analyze the more complex and powerful variant, Redux, but you can read more [here](https://react.dev/reference/react/createContext) about React Context, a simpler variant that can be very efficient, especially in small to medium-sized applications

### 3.2 Redux

- **Redux** is an open-source library for managing and centralizing application state

- The main concepts in Redux are:
  - **store** (the global "database")
    - an object that contains the entire application state
    - the state is modified _only_ through special functions called _reducers_

  - **reducers**
    - a pure function _(for the same input, always returns the same output)_ that modifies the current state as a result of an _action_
    - receives the current state and an action and returns a _new_ state

  - **actions**
    - objects that describe the intention to modify the state
    - are sent to reducers

  - **action creators**
    - functions used to create action objects
    - usually called right before dispatch

  - **dispatch**
    - the process of sending an action to the store

  - **middleware**
    - additional functionality that can be introduced between sending an action and its processing by the reducer
    - e.g., logging

- In Redux, you can observe a **unidirectional data flow**, which means that data flows in one direction: through actions -> reducers -> store

- This flow can be followed step by step:
  - At _initialization_:
    - a Redux store is created using a reducer function
    - the store calls the reducer once and saves the initial values returned
    - UI components can now access the current state of the store and can receive all future updates as they happen, to display the correct data

  - At _update_:
    - an event determines the need to update data
    - an action is dispatched to the Redux store, e.g., _dispatch({type: 'INCREMENT_COUNTER'})_
    - the reducer is called, receiving the previous state and the action type, and returns the new state, which is saved
    - the store notifies the entire application about this update
    - each component that uses that part of the store is re-rendered to display the correct information

![redux flow](https://redux.js.org/assets/images/ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)

## 4. Using Redux

- In the store, we'll save the movie data that we'll fetch when accessing the main route, so that it's available everywhere in the application

- Also at the store level, we'll synchronize the process of adding a new movie and use the number of stored movies for the NotFound page, defining a message like: "Page not found, but you can browse N movies here"

- We'll also preserve the state of the search bar, so that, even when navigating from one page to another, the latest search results are still available

- The first step is to install Redux and the Redux plugin for React

  ```sh
  npm install --save redux react-redux
  ```

- Next, we'll create a file containing the actions and the associated action creators for each event, a file containing the movies reducer, and a file containing the store:
  - _src/actions/movies.js_

  ```js
  // defining the actions
  export const ADD_MOVIE = "ADD_MOVIE";
  export const DELETE_MOVIE = "DELETE_MOVIE";
  export const SET_MOVIES = "SET_MOVIES";
  export const SET_SEARCH_TITLE = "SET_SEARCH_CONTENT";

  // defining the action creators used by redux to determine which action should be dispatched and what it should contain
  export function addMovie(movie) {
    return {
      type: ADD_MOVIE,
      payload: movie,
    };
  }

  export function deleteMovie(movieId) {
    return {
      type: DELETE_MOVIE,
      payload: movieId,
    };
  }

  export function setMovies(movies) {
    return {
      type: SET_MOVIES,
      payload: movies,
    };
  }

  export function setSearchTitle(title) {
    return {
      type: SET_SEARCH_TITLE,
      payload: title,
    };
  }
  ```

  - _src/reducers/movies.js_

  ```js
  // importing the actions
  import {
    ADD_MOVIE,
    DELETE_MOVIE,
    SET_MOVIES,
    SET_SEARCH_TITLE,
  } from "../actions/movies";

  // the initial state that will be available before any action is dispatched
  const initialState = { data: [], searchTitle: "" };

  export function moviesReducer(state = initialState, action) {
    switch (action.type) {
      case ADD_MOVIE:
        // the state is immutable, so reducers must reconstruct, for any action, the state based on previous values and the current payload
        return { ...state, data: [...state.data, action.payload] };
      case DELETE_MOVIE:
        return {
          ...state,
          data: [...state.data.filter((movie) => movie.id !== action.payload)],
        };
      case SET_MOVIES:
        return { ...state, data: [...action.payload] };
      case SET_SEARCH_TITLE:
        return { ...state, searchTitle: action.payload };
      default:
        return state;
    }
  }
  ```

  - _src/reducers/index.js_

  ```js
  import { combineReducers } from "redux";
  import { moviesReducer } from "./movies";

  // usually, an application requires multiple reducers which can be combined into a single one using the combineReducers function
  export default combineReducers({
    movies: moviesReducer,
  });
  ```

  - _src/stores/store.js_

  ```js
  import { createStore } from "redux";
  import rootReducer from "../reducers";

  // creating the store based on the root reducer
  export default createStore(rootReducer);
  ```

- Before we can use the store and actions in the application, it must be _wrapped in a Redux context_
  - _src/main.jsx_

  ```js
  import { createRoot } from "react-dom/client";
  import "./index.css";
  import App from "./App";
  import store from "./stores/store";
  import { Provider } from "react-redux";

  createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  );
  ```

- We'll load the data into the store when accessing the application, in the _Home_ component
  - _src/pages/Home/index.jsx_

  ```js
  import { useEffect } from "react";
  import { useNavigate } from "react-router";
  import { useDispatch } from "react-redux";
  import { setMovies } from "../../actions/movies";
  import "./style.css";

  const SERVER_URL = "http://localhost:8080/api/v1";

  const Home = () => {
    // hook for navigating to a desired page
    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
      fetch(`${SERVER_URL}/movies`)
        .then((res) => res.json())
        // dispatching the setMovies action
        .then((data) => dispatch(setMovies(data.records)));
    }, []);

    return (
      <div className="home">
        <h1>Explore movies</h1>
        <button className="custom-button" onClick={() => navigate("/movies")}>
          Start now
        </button>
        <br />
        <h1>Explore the latest series</h1>
        <button className="custom-button" onClick={() => navigate("/series")}>
          Start now
        </button>
      </div>
    );
  };

  export { Home };
  ```

- And we'll access the value in the _NotFound_ page
  - _src/pages/NotFound/index.jsx_

  ```js
  import { useSelector } from "react-redux";
  import { useNavigate } from "react-router";

  const NotFound = () => {
    // accessing the redux state through the "movies" label set in the combineReducers call
    const movies = useSelector((state) => state.movies.data);
    const navigate = useNavigate();

    return (
      <div>
        <h1>Page not found.</h1>
        <div>
          {`However, you can explore ${movies.length} movies`}{" "}
          <span onClick={() => navigate("/movies")}>here</span>
        </div>
      </div>
    );
  };

  export { NotFound };
  ```

- Additionally, we'll modify the Movies page to integrate the first, the second and the third action, addMovie, setMovies and deleteMovie, which will be called right after a movie is added or removed or when the movie list should be refreshed
  - _src/pages/Movies/index.jsx_

  ```js
  import { useState } from "react";
  import { useDispatch } from "react-redux";
  import { useSelector } from "react-redux";
  import {
    addMovie as addMovieAction,
    setMovies as setMoviesAction,
    deleteMovie as deleteMovieAction,
  } from "../../actions/movies";

  import { MovieCard } from "../../components/MovieCard";

  import "./style.css";
  import { CreateMovieModal } from "../../components/CreateMovieModal";
  import { Searchbar } from "../../components/Searchbar";

  const SERVER_URL = "http://localhost:8080/api/v1";

  const Movies = () => {
    const movies = useSelector((state) => state.movies.data);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();

    const getMovies = (queryTitle) => {
      const queryParams = new URLSearchParams();

      if (!!queryTitle) {
        queryParams.append("title", queryTitle);
      }

      fetch(`${SERVER_URL}/movies?` + queryParams)
        .then((res) => res.json())
        // after refreshing the movies list, refresh the store as well
        .then((data) => dispatch(setMoviesAction(data.records)));
    };

    const addMovie = (movie) => {
      fetch(`${SERVER_URL}/movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      })
        .then((res) => res.json())
        .then((data) => {
          // after adding a movie, we add it to the store
          dispatch(addMovieAction(data.movie));
          getMovies();
        })
        .catch((err) => console.log(err));
    };

    const deleteMovie = (movie) => {
      fetch(`${SERVER_URL}/movies/${movie.id}`, { method: "DELETE" })
        .then((res) => getMovies())
        // after removing a movie, we also remove it from the store
        .then(() => dispatch(deleteMovieAction(movie.id)))
        .catch((err) => console.log(err));
    };

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
            {movies.map((movie, index) => (
              <MovieCard movie={movie} key={index} onDelete={deleteMovie} />
            ))}
          </div>
        </div>
        {isModalOpen && (
          <CreateMovieModal onAddMovie={addMovie} closeModal={closeModal} />
        )}
      </div>
    );
  };

  export { Movies };
  ```

- In the Searchbar component we'll add a navigation button to a non-existent page to observe the automatic state update, and we'll integrate the setSearchTitle action to preserve the search state during navigation
  - _src/components/Searchbar/index.jsx_

  ```js
  import { useNavigate } from "react-router";
  import { useSelector } from "react-redux";
  import { useDispatch } from "react-redux";
  import { useState } from "react";

  import "./style.css";
  import { setSearchTitle } from "../../actions/movies";

  const Searchbar = ({ openModal, getMovies }) => {
    const queryTitle = useSelector((state) => state.movies.searchTitle);
    const dispatch = useDispatch();

    // bind the search value from the redux store to the value in the input element
    const [temporaryQueryTitle, setTemporaryQueryTitle] = useState(queryTitle);

    const navigate = useNavigate();

    const searchMovie = (queryTitle) => {
      // when a search is performed, save in redux the value shown in the search bar
      dispatch(setSearchTitle(queryTitle));
      getMovies(queryTitle);
    };

    return (
      <div className="toolbar">
        <input
          value={temporaryQueryTitle}
          onChange={(e) => setTemporaryQueryTitle(e.target.value)}
          id="search"
          className="searchbar custom-text-input"
          type="text"
          placeholder="Search for a movie"
        />
        <button
          className="custom-button"
          onClick={() => searchMovie(temporaryQueryTitle)}
        >
          Search
        </button>
        <button className="custom-button" onClick={() => openModal()}>
          Add a movie
        </button>
        // navigation to a non-existent page
        <button className="custom-button" onClick={() => navigate("/series")}>
          Series Page
        </button>
      </div>
    );
  };

  export { Searchbar };
  ```

## 5. Individual work

- Using the techniques discussed in this lab, refactor the Person and Collection pages to be integrated with the React Router setup, and use Redux to manage their state through separate reducers
