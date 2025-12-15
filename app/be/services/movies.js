import { Op } from "sequelize";
import { Movie } from "../models/config.js";

const getMovies = async (filters) => {
  const entityKeys = Object.keys(Movie.getAttributes());

  delete filters.id;
  delete filters.poster;

  const whereCondition = Object.keys(filters)
    .filter((key) => entityKeys.includes(key))
    .map((key) => {
      if (key === "title" || key === "director") {
        return { [key]: { [Op.like]: `%${filters[key]}%` } };
      }

      return { [key]: filters[key] };
    });

  return await Movie.findAll({
    attributes: [
      "id",
      "title",
      "year",
      "director",
      "genre",
      "duration",
      "synopsis",
      "poster",
    ],
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
