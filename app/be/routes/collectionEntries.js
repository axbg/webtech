import express from "express";
import * as collectionEntriesController from "../controllers/collectionEntries.js";

export const router = express.Router();

router.post("/", collectionEntriesController.createCollectionEntry);

