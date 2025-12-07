import * as collectionEntriesService from "../services/collectionEntries.js";

const createCollectionEntry = async (req, res) => {
  try {
    res.status(201).send({
      collection: await collectionEntriesService.createCollectionEntry(
        req.body,
      ),
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

export { createCollectionEntry };

