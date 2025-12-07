import express from "express";
import { router as moviesRouter } from "./movies.js";
import { router as collectionsRouter } from "./collections.js";
import { router as collectionEntriesRouter } from "./collectionEntries.js";

export const router = express.Router();

router.use("/movies", moviesRouter);
router.use("/collections", collectionsRouter);
router.use("/collectionEntries", collectionEntriesRouter);

