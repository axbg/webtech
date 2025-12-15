import * as collectionsService from "../services/collections.js";

const getCollections = async (req, res) => {
  res.status(200).send({
    collections: await collectionsService.getCollections(req.query.name),
  });
};

const createCollection = async (req, res) => {
  try {
    res.status(201).send({
      collection: await collectionsService.createCollection(req.body),
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

export { getCollections, createCollection };

