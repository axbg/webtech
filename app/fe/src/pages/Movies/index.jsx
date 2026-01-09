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
  const searchTitle = useSelector((state) => state.movies.searchTitle);

  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const deleteMovie = (movie) => {
    fetch(`${SERVER_URL}/movies/${movie.id}`, { method: "DELETE" })
      .then((res) => getMovies())
      .then(() => dispatch(deleteMovieAction(movie.id)))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMovies(searchTitle);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const switchView = () => {
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
        {viewMode === "list" && (
          <MovieList
            movies={movies}
            deleteMovie={deleteMovie}
            updateMovie={updateMovie}
          />
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
