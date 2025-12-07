import express from "express";
import * as collectionsController from "../controllers/collections.js";

export const router = express.Router();

router.get("/", collectionsController.getCollections);

router.post("/", collectionsController.createCollection);

