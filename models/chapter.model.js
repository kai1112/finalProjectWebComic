const mongoose = require('./dbConnection');

const ChapterSchema = mongoose.Schema({
  chap: Number,
  title: String,
  content: String,
  views: Number,
  mangaID: {
    type: String,
    ref: "Manga", required: true
  },
  slug: String
}, { collection: "Chapter", timestamps: true });
const ChapterModel = mongoose.model("Chapter", ChapterSchema);

module.exports = ChapterModel;