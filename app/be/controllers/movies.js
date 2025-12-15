import * as moviesService from "../services/movies.js";

const getMovies = async (req, res) => {
  res.send({ records: await moviesService.getMovies(req.query) });
};

const createMovie = async (req, res) => {
  try {
    res.status(201).send({ movie: await moviesService.createMovie(req.body) });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const updateMovie = async (req, res) => {
  const updatedMovie = await moviesService.updateMovie(req.body);

  if (!!updatedMovie) {
    res.status(200).send(updatedMovie);
  } else {
    res.status(404).send({ message: "Movie was not found" });
  }
};

const deleteMovie = async (req, res) => {
  await moviesService.deleteMovie(req.params.id);
  res.status(200).send();
};

export { getMovies, createMovie, updateMovie, deleteMovie };
