export const ADD_MOVIE = "ADD_MOVIE";
export const DELETE_MOVIE = "DELETE_MOVIE";
export const SET_MOVIES = "SET_MOVIES";
export const SET_SEARCH_TITLE = "SET_SEARCH_CONTENT";

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
    payload: title
  }
}
