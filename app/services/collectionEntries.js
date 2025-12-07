import { Collection, Movie } from "../models/config.js";

const createCollectionEntry = async (data) => {
  if (!data.collectionId || !data.movieId) {
    throw new Error("Invalid request: missing collectionId or movieId");
  }

  const collection = await Collection.findOne({
    where: { id: data.collectionId },
  });

  const movie = await Movie.findOne({
    where: { id: data.movieId },
  });

  if (!collection || !movie) {
    throw new Error("Collection of movie is not present in db");
  }

  await collection.addMovie(movie);
};

export { createCollectionEntry };

