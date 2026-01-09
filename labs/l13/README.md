# React: UI libraries

## Table of contents

1. [Material UI](#1-material-ui)
2. [Integrating Material UI](#2-integrating-material-ui)
   1. [Installation](#21-installation)
   2. [Using Basic Components](#22-using-basic-components)
   3. [Using Tables](#23-using-tables)
3. [PrimeReact](#3-primereact)
4. [Bonus: Editing a Movie](#4-bonus-editing-a-movie)
5. [Individual Work](#5-individual-work)

## 1. Material UI

- Often, to facilitate web application development, developers use an external library that provides visual components

- Such an approach ensures consistency in the application's visual appearance, since components imported from the library are, most of the time, already styled

- One of the popular choices for React (and beyond) is **Material UI**

- **Material UI** is a component library built following the _"Material Design"_ principles developed by Google

- Some key features of Material UI include:
  - **Predefined components**:
    - Material UI offers a wide range of _ready-to-use_ components, such as buttons, navigation elements, dialogs, modals, text fields, etc.

  - [**Styling according to Material Design principles**](https://m2.material.io/design/introduction)

  - **Customizable theming**
    - Material UI supports customizing the appearance of a component through themes
    - Developers can select colors, fonts, and other details to match their own project's visual identity

  - **Responsiveness support**

  - **Rich documentation and active community**

## 2. Integrating Material UI

### 2.1 Installation

- According to the [documentation](https://mui.com/material-ui/getting-started/installation/), we can install Material UI like any other package, using _npm_

  ```sh
  npm install --save @mui/material @emotion/react @emotion/styled
  ```

- Besides the core components, Material UI defines a series of optional components that can be integrated into the application if needed

- For developing the table from section [2.3](#23-using-tables), we'll need a package containing the table implementation and a package containing icons defined by Material

  ```sh
  npm install --save @mui/x-data-grid @mui/icons-material
  ```

### 2.2 Using Basic Components

- To see how we can use components imported from Material UI instead of previously defined custom elements, we'll update the MovieCard component

- After rewriting the component, we'll notice that it no longer uses any custom styles defined in the _style.css_ file, which is one of the main advantages of using a visual library: increasing development speed and consistency

- _src/components/MovieCard/index.jsx_

  ```js
  import "./style.css";
  import {
    Card,
    CardContent,
    Button,
    Box,
    Grid,
    Typography,
  } from "@mui/material";

  // the MovieCard component receives a prop called movie - the object describing a film
  // an onDelete function that will be called when element removal is triggered
  const MovieCard = ({ movie, onDelete }) => {
    const confirmDelete = (movie) => {
      if (window.confirm(`Do you want to delete ${movie.title}?`)) {
        onDelete(movie);
      }
    };

    return (
      <Card variant="outlined" sx={{ marginTop: 2 }}>
        {/* using the Card and CardContent component to display content in a structured form */}
        <CardContent>
          {/* using the grid component to arrange and space elements */}
          <Grid container spacing={2} columns={12}>
            <Grid item xs={2}>
              <img
                alt="movie-img"
                style={{ maxWidth: "100%", height: "auto" }}
                src={movie.poster}
              />
            </Grid>
            <Grid item xs={10}>
              <Grid container columns={12}>
                <Grid item xs={5}>
                  {/* using the Typography component for text styling */}
                  <Typography variant="h6">
                    {`${movie.title} (${movie.year})`}
                  </Typography>
                </Grid>
                <Grid item xs={7} textAlign="right">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => confirmDelete(movie)}
                  >
                    X
                  </Button>
                </Grid>
              </Grid>
              <Box mt={2} mb={2}>
                {/* sx - property for custom styling */}
                <Typography sx={{ fontStyle: "italic" }}>
                  {`${movie.genre} • ${movie.duration} minutes • ${movie.director}`}
                </Typography>
              </Box>
              {/* color selected from default theme https://mui.com/material-ui/customization/palette/ */}
              <Box
                backgroundColor="warning.main"
                p={2}
                sx={{ borderRadius: 5 }}
                color="white"
              >
                {movie.synopsis}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  export { MovieCard };
  ```

### 2.3 Using Tables

- Besides basic components, Material UI offers many smart components that, beyond a specific appearance, come with a series of already implemented functionalities

- As an example, we'll integrate the [Data Grid](https://mui.com/x/react-data-grid/) component, which displays data in a table format, but integrates by default pagination, sorting, and filtering

- To simplify the table integration, we'll define a new component, _MovieTable_, and a style file where we'll add two classes
  - _src/components/MovieTable/index.jsx_

    ```js
    import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
    import DeleteIcon from "@mui/icons-material/DeleteOutlined";

    import "./style.css";

    const MovieTable = ({ movies, deleteMovie }) => {
      // column configuration
      const columns = [
        {
          field: "id",
          headerName: "ID",
          flex: 0.1,
          align: "center",
          headerClassName: "table-header",
          headerAlign: "center",
        },
        {
          field: "title",
          headerName: "Title",
          flex: 1,
          align: "center",
          headerClassName: "table-header",
          headerAlign: "center",
        },
        {
          field: "director",
          headerName: "Director",
          flex: 1,
          align: "center",
          headerClassName: "table-header",
          headerAlign: "center",
        },
        {
          field: "year",
          headerName: "Year",
          type: "number",
          flex: 0.5,
          align: "center",
          headerClassName: "table-header",
          headerAlign: "center",
        },
        {
          field: "genre",
          headerName: "Genre",
          flex: 0.5,
          align: "center",
          headerClassName: "table-header",
          headerAlign: "center",
        },
        {
          field: "duration",
          headerName: "Duration",
          type: "number",
          flex: 0.5,
          align: "center",
          headerClassName: "table-header",
          headerAlign: "center",
        },
        {
          field: "actions",
          type: "actions",
          headerName: "Remove",
          align: "center",
          headerClassName: "table-header",
          flex: 0.5,
          // configuring action buttons
          getActions: ({ id }) => {
            return [
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={() => {
                  if (window.confirm("Do you want to delete this movie?")) {
                    deleteMovie({ id: id });
                  }
                }}
                color="inherit"
              />,
            ];
          },
        },
      ];

      return (
        <div className="table-container">
          {/* using DataGrid */}
          <DataGrid rows={movies} columns={columns} />
        </div>
      );
    };

    export { MovieTable };
    ```

  - _src/components/MovieTable/style.css_

    ```css
    .table-container {
      height: 350px;
      margin: 0 auto;
      width: 100%;
      background-color: white;
    }

    .table-header {
      background-color: whitesmoke;
    }
    ```

- Additionally, we'll define another component called _MovieList_ and we'll move the existing implementation from the _Movie_ page
  - _src/components/MovieList/index.jsx_

    ```js
    import { MovieCard } from "../MovieCard";

    const MovieList = ({ movies, updateMovie, deleteMovie }) => {
      return (
        <div id="moviesContainer">
          {movies.map((movie, index) => (
            <MovieCard
              movie={movie}
              key={index}
              onUpdate={updateMovie}
              onDelete={deleteMovie}
            />
          ))}
        </div>
      );
    };

    export { MovieList };
    ```

- In the _Movie_ page, we'll add a mechanism that will allow us to conditionally display one of the two viewing modes
  - _src/pages/Movie/index.jsx_

    ```js
    import { useState, useEffect } from "react";
    import { useDispatch, useSelector } from "react-redux";
    import {
      addMovie as addMovieAction,
      setMovies as setMoviesAction,
      deleteMovie as deleteMovieAction,
    } from "../../actions/movies";

    import { MovieList } from "../../components/MovieList";
    import { MovieTable } from "../../components/MovieTable";

    import "./style.css";
    import { CreateMovieModal } from "../../components/CreateMovieModal";
    import { Searchbar } from "../../components/Searchbar";

    const SERVER_URL = "http://localhost:8080/api/v1";

    const Movies = () => {
      const movies = useSelector((state) => state.movies.data);

      const [isModalOpen, setIsModalOpen] = useState(false);
      // defining a new state that will reflect the selected viewing mode, with the default value being list
      const [viewMode, setViewMode] = useState("list");

      const dispatch = useDispatch();

      const getMovies = (queryTitle) => {
        const queryParams = new URLSearchParams();

        if (!!queryTitle) {
          queryParams.append("title", queryTitle);
        }

        fetch(`${SERVER_URL}/movies?` + queryParams)
          .then((res) => res.json())
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
          .then((res) => {
            dispatch(addMovieAction(movie));
            getMovies();
          })
          .catch((err) => console.log(err));
      };

      const deleteMovie = (movie) => {
        fetch(`${SERVER_URL}/movies/${movie.id}`, { method: "DELETE" })
          .then((res) => getMovies())
          .then(() => dispatch(deleteMovieAction(movie.id)))
          .catch((err) => console.log(err));
      };

      useEffect(() => {
        getMovies();
      }, []);

      const openModal = () => {
        setIsModalOpen(true);
      };

      const closeModal = () => {
        setIsModalOpen(false);
      };

      const switchView = () => {
        // the switchView method will update the viewing mode through a pseudo "toggle" mechanism
        setViewMode(viewMode === "list" ? "table" : "list");
      };

      return (
        <div>
          <div className="container">
            <h3>All movies</h3>
            <Searchbar
              openModal={openModal}
              getMovies={getMovies}
              switchView={switchView}
            />
            {/* depending on the viewMode property value, one of the two viewing components will be displayed */}
            {viewMode === "list" && (
              <MovieList movies={movies} deleteMovie={deleteMovie} />
            )}
            {viewMode === "table" && (
              <MovieTable movies={movies} deleteMovie={deleteMovie} />
            )}
          </div>
          {isModalOpen && (
            <CreateMovieModal onAddMovie={addMovie} closeModal={closeModal} />
          )}
        </div>
      );
    };

    export { Movies };
    ```

- As we can see, the viewing mode can be changed from within the _Searchbar_ component, which we also need to update
  - _src/components/Searchbar/index.jsx_

    ```js
    import { useState } from "react";
    import { useNavigate } from "react-router";
    import { useSelector } from "react-redux";
    import { useDispatch } from "react-redux";

    import "./style.css";
    import { setSearchTitle } from "../../actions/movies";

    const Searchbar = ({ openModal, getMovies, switchView }) => {
      const queryTitle = useSelector((state) => state.movies.searchTitle);
      const dispatch = useDispatch();

      const [temporaryQueryTitle, setTemporaryQueryTitle] =
        useState(queryTitle);

      const navigate = useNavigate();

      const searchMovie = (queryTitle) => {
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
          {/* new button that will allow switching viewing modes, calling the switchView method received as props */}
          <button className="custom-button" onClick={() => switchView()}>
            Switch view
          </button>
          <button className="custom-button" onClick={() => openModal()}>
            Add a movie
          </button>
          <button className="custom-button" onClick={() => navigate("/series")}>
            Series Page
          </button>
        </div>
      );
    };

    export { Searchbar };
    ```

## 3. PrimeReact

- Another component library widely used in React applications is [PrimeReact](https://primereact.org/), which has a different appearance from Material UI, as well as components with different functionalities and a different usage philosophy

- Watch the videos below to see how you can use PrimeReact to implement a table similar to the one defined earlier
  - [Integrating a table](https://www.youtube.com/watch?v=gpIXwZZxKws)
  - [Pagination and filtering table data](https://www.youtube.com/watch?v=YjN0cq2BO6k)
  - [Sorting table data](https://www.youtube.com/watch?v=n-xsJh0Xi1Y)

- Additionally, besides "traditional" component libraries, which often offer developers an improved version of native browser elements, there are libraries that simplify the implementation of particular scenarios, such as drawing a map or a chart

- Watch the video below to see how you can use Google Charts in a React application
  - [Using Google Charts](https://www.youtube.com/watch?v=ss2Xui0NT-U)

## 4. Bonus: Editing a Movie

- To be fully functional, the _Movies_ page should support the functionality to edit an already existing movie

- To implement this scenario, we'll update the _MovieCard_ component and use components imported from Material UI to define the new fields
  - _src/components/MovieCard/index.jsx_

    ```js
    import { useState } from "react";

    import {
      Card,
      CardContent,
      Button,
      Box,
      Grid,
      Typography,
      TextField,
    } from "@mui/material";

    // the MovieCard component receives a prop called movie - the object describing a film
    // an onUpdate function that will be called when element update is desired
    // an onDelete function that will be called when element deletion is desired
    const MovieCard = ({ movie, onUpdate, onDelete }) => {
      // property that will determine the viewing mode: read or edit
      const [isEditable, setIsEditable] = useState(false);
      // property that will contain the updated values as the edit form is filled
      const [movieDetails, setMovieDetails] = useState({ ...movie });

      const confirmDelete = (movie) => {
        if (window.confirm(`Do you want to delete ${movie.title}?`)) {
          onDelete(movie);
        }
      };

      // when updating a value in the movie form, it is saved in the local state
      const updateMovieDetail = (event) => {
        setMovieDetails({
          ...movieDetails,
          [event.target.name]: event.target.value,
        });
      };

      // method that will cancel changes made to the movie and switch to read mode
      const cancelUpdate = () => {
        setMovieDetails({ ...movie });
        setIsEditable(false);
      };

      // method that will use the onUpdate prop, received from the parent component, to update movie data
      // also, it will switch to read mode
      const updateMovie = (event) => {
        // canceling the native submit event emitted by the form
        event.preventDefault();

        onUpdate(movieDetails);
        setIsEditable(false);
      };

      return (
        <Card variant="outlined" sx={{ marginTop: 2 }}>
          {/* depending on the isEditable property value, either edit mode or read mode will be displayed */}
          {isEditable ? (
            <CardContent>
              {/* defining a form that will call the updateMovie method when the submit button is pressed */}
              <form onSubmit={updateMovie}>
                <Grid container columnSpacing={1} direction="column">
                  <TextField
                    label="Title"
                    value={movieDetails.title}
                    error={!movieDetails.title}
                    onChange={updateMovieDetail}
                    type="text"
                    id="title"
                    name="title"
                    required
                  />
                  <br />
                  <TextField
                    label="Year"
                    value={movieDetails.year}
                    error={!movieDetails.year}
                    InputProps={{ inputProps: { min: 1930, max: 2100 } }}
                    onChange={updateMovieDetail}
                    type="number"
                    id="year"
                    name="year"
                    required
                  />
                  <br />
                  <TextField
                    label="Director"
                    value={movieDetails.director}
                    error={!movieDetails.director}
                    onChange={updateMovieDetail}
                    type="text"
                    id="director"
                    name="director"
                    required
                  />
                  <br />
                  <TextField
                    label="Genre"
                    value={movieDetails.genre}
                    error={!movieDetails.genre}
                    onChange={updateMovieDetail}
                    type="text"
                    id="genre"
                    name="genre"
                    required
                  />
                  <br />
                  <TextField
                    multiline
                    rows={4}
                    label="Synopsis"
                    value={movieDetails.synopsis}
                    onChange={updateMovieDetail}
                    id="synopsis"
                    name="synopsis"
                  />
                  <br />
                  <TextField
                    label="Duration (minutes)"
                    value={movieDetails.duration}
                    onChange={updateMovieDetail}
                    type="number"
                    id="duration"
                    name="duration"
                  />
                  <br />
                  <TextField
                    label="Poster URL"
                    value={movieDetails.poster}
                    onChange={updateMovieDetail}
                    type="url"
                    id="poster"
                    name="poster"
                  />
                  <br />
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="warning"
                  sx={{ marginRight: 1 }}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={cancelUpdate}
                >
                  Abort changes
                </Button>
              </form>
            </CardContent>
          ) : (
            <CardContent>
              <Grid container spacing={2} columns={12}>
                <Grid item xs={2}>
                  <img
                    alt="movie-img"
                    style={{ maxWidth: "100%", height: "auto" }}
                    src={movie.poster}
                  />
                </Grid>
                <Grid item xs={10}>
                  <Grid container columns={12}>
                    <Grid item xs={5}>
                      <Typography variant="h6">
                        {`${movie.title} (${movie.year})`}
                      </Typography>
                    </Grid>
                    <Grid item xs={7} textAlign="right">
                      {/* button that will allow switching to edit mode */}
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => setIsEditable(true)}
                        sx={{ marginRight: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => confirmDelete(movie)}
                      >
                        X
                      </Button>
                    </Grid>
                  </Grid>
                  <Box mt={2} mb={2}>
                    <Typography sx={{ fontStyle: "italic" }}>
                      {`${movie.genre} • ${movie.duration} minutes • ${movie.director}`}
                    </Typography>
                  </Box>
                  <Box
                    backgroundColor="warning.main"
                    p={2}
                    sx={{ borderRadius: 5 }}
                    color="white"
                  >
                    {movie.synopsis}
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          )}
        </Card>
      );
    };

    export { MovieCard };
    ```

- In the _Movie_ page, we'll add the _onUpdate_ method that's passed as a prop, which executes a call using the data update endpoint exposed by the back-end and updates the data without reloading the entire movie list
  - _src/pages/Movie/index.jsx_

    ```js
    const updateMovie = (movie) => {
      fetch(`${SERVER_URL}/movies`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      })
        .then((res) => updateMovies(movie))
        .catch((err) => console.log(err));
    };

    const updateMovies = (updatedMovie) => {
      dispatch(
        setMoviesAction(
          movies.map((movie) =>
            movie.id === updatedMovie.id ? { ...updatedMovie } : { ...movie },
          ),
        ),
      );
    };
    ```

## 5. Individual Work

- To become more comfortable with Material UI, try replacing the remaining components in the application with components imported from Material UI

- You can find here [the component list](https://mui.com/material-ui/all-components/)
