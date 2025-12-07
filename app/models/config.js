import { DataTypes, Sequelize } from "sequelize";
import { MovieTemplate } from "./movies.js";
import { CollectionTemplate } from "./collections.js";

export const db = new Sequelize({
  dialect: "sqlite",
  storage: "action.db",
});

export const synchronizeDatabase = async () => {
  await db.authenticate();
  await db.sync();
};

const Movie = MovieTemplate(db, DataTypes);
const Collection = CollectionTemplate(db, DataTypes);

Movie.belongsToMany(Collection, { through: "movie_collections" });
Collection.belongsToMany(Movie, { through: "movie_collections" });

export { Movie, Collection };

