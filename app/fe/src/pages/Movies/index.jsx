import { useState, useEffect } from "react";

import { MovieCard } from "../../components/MovieCard/index.jsx";

import "./style.css";
import { CreateMovieModal } from "../../components/CreateMovieModal/index.jsx";
import { Searchbar } from "../../components/Searchbar/index.jsx";

const SERVER_URL = "http://localhost:8080/api/v1";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getMovies = (queryTitle) => {
    const queryParams = new URLSearchParams();

    if (!!queryTitle) {
      queryParams.append("title", queryTitle);
    }

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
    if (confirm("Do you really want to delete this movie?")) {
      fetch(`${SERVER_URL}/movies/${movie.id}`, { method: "DELETE" })
        .then((res) => getMovies())
        .catch((err) => console.log(err));
    }
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

