import express from 'express';
import * as moviesController from "../controllers/movies.js";

export const router = express.Router();

router.get("/", moviesController.getMovies);

router.post("/", moviesController.create);

