import './style.css';

const MovieCard = ({ movie, onDelete }) => {
  return (
    <div className="movie-container">
      <img alt="movie-img" className="poster-container" src={movie.poster} />
      <div className="movie-info-container">
        <div className="movie-header">
          <h4 className="movieTitle">
            {`${movie.title} (${movie.year})`}
          </h4>
          <button className="remove-btn" onClick={() => onDelete(movie)}>X</button>
        </div>
        <div className="movie-specs">
          {`${movie.genre} • ${movie.duration} minutes • ${movie.director}`}
        </div>
        <div className="movie-synopsis">
          {movie.synopsis}
        </div>
      </div>
    </div>
  )
};

export { MovieCard };
