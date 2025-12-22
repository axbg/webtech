import { useState } from "react";

import "./style.css";

const Searchbar = ({ openModal, getMovies }) => {
  const [queryTitle, setQueryTitle] = useState(null);

  const onChangeQueryTitle = (event) => {
    const searchedMovieTitle = event.target.value;
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

