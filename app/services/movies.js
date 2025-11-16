import { movies } from "../models/movies.js";

const getMovies = (title) => {
  if (!!title) {
    console.log(`Retrieving movies with title ${title}`)
    return movies.filter(movie => movie.includes(title));
  }

  console.log("Retrieving all movies");
  return movies;
};

const createMovie = (title) => {
  if (movies.includes(title)) {
    console.log(`Movie ${title} already exists`);
    throw new Error("Movie already exists!");
  }

  console.log(`Added new movie ${title}`);
  movies.push(title);
  return title;
};

export {
  getMovies,
  createMovie
}  
