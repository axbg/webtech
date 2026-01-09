import { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import "./style.css";
import { setSearchTitle } from "../../actions/movies";

const Searchbar = ({ openModal, getMovies, switchView }) => {
  const queryTitle = useSelector((state) => state.movies.searchTitle);
  const dispatch = useDispatch();

  const [temporaryQueryTitle, setTemporaryQueryTitle] = useState(queryTitle);

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
