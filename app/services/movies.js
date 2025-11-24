import { Op } from "sequelize";
import { Movie } from "../models/movies.js";

const getMovies = async (filters) => {
  const entityKeys = Object.keys(Movie.getAttributes());

  delete filters.id;
  delete filters.poster;

  // we define a dynamic selection condition based on the fields received as parameters
  // but before doing that we are filtering out invalid fields
  const whereCondition = Object.keys(filters)
    .filter((key) => entityKeys.includes(key))
    .map((key) => {
      // apply "like" clause on title and director instead of equal
      if (key === "title" || key === "director") {
        return { [key]: { [Op.like]: `%${filters[key]}%` } };
      }

      return { [key]: filters[key] };
    });

  return await Movie.findAll({
    attributes: ["id", "title", "year", "director", "genre", "poster"],
    where: whereCondition,
  });
};

const createMovie = async (movie) => {
  delete movie.id;

  return Movie.create(movie);
};

const updateMovie = async (movie) => {
  const identifiedMovie = await Movie.findOne({ where: { id: movie.id } });

  if (!!identifiedMovie) {
    identifiedMovie.set({ ...movie });
    return await identifiedMovie.save();
  }
};

const deleteMovie = async (id) => {
  return await Movie.destroy({ where: { id: id } });
};

export { getMovies, createMovie, updateMovie, deleteMovie };
