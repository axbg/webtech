import express from "express";
import * as moviesController from "../controllers/movies.js";

export const router = express.Router();

router.get("/", moviesController.getMovies);

router.post("/", moviesController.createMovie);

router.patch("/", moviesController.updateMovie);

router.delete("/:id", moviesController.deleteMovie);
