const mongoose = require("./dbConnection");

const LibrarySchema = mongoose.Schema(
  {
    status: String,
    userID: {
      type: String,
      ref: "User",
    },
    mangaID: {
      type: String,
      ref: "Manga",
    },
  },
  { collection: "Library" }
);

const LibraryModel = mongoose.model("Library", LibrarySchema);

module.exports = LibraryModel;
