import { DataTypes } from "sequelize";
import { db } from "./config.js";

export const Movie = db.define(
  "Movie",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1900,
        max: 2024,
      },
    },
    director: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
    },
    synopsis: {
      type: DataTypes.TEXT,
    },
    duration: {
      type: DataTypes.TINYINT,
    },
    poster: {
      type: DataTypes.STRING,
    },
  },
  {
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["title", "year", "director"],
      },
    ],
  },
);

