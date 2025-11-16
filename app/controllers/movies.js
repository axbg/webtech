import * as moviesService from "../services/movies.js";

const getMovies = (req, res) => {
  res.send({ records: moviesService.getMovies(req.query.title) });
};

const create = (req, res) => {
  try {
    res.status(201).send({ movie: moviesService.createMovie(req.body.title) });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

export {
  getMovies,
  create
}
