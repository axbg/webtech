import { Op } from "sequelize";
import { Collection, Movie } from "../models/config.js";

const getCollections = async (name) => {
  return await Collection.findAll({
    where: { name: { [Op.like]: `%${name}%` } },
    include: {
      model: Movie,
      through: {
        attributes: [],
      },
    },
  });
};

const createCollection = async (data) => {
  if (!data.name) {
    throw Error(
      "Incomplete data: a collection should have at least a name and an optional poster",
    );
  }

  return await Collection.create({ name: data.name, poster: data.poster });
};

export { getCollections, createCollection };

