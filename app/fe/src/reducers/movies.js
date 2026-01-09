import { ADD_MOVIE, DELETE_MOVIE, SET_MOVIES, SET_SEARCH_TITLE } from "../actions/movies";

const initialState = { data: [], searchTitle: "" };

export function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MOVIE:
      return { ...state, data: [...state.data, action.payload] }
    case DELETE_MOVIE:
      return { ...state, data: [...state.data.filter(movie => movie.id !== action.payload)] }
    case SET_MOVIES:
      return { ...state, data: [...action.payload] }
    case SET_SEARCH_TITLE:
      return { ...state, searchTitle: action.payload }
    default:
      return state
  }
}
