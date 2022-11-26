const mongoose = require("./dbConnection");

const MangaSchema = mongoose.Schema(
  {
    avatar: String,
    backgroud_avatar: String,
    category: [{}],
    name: String,
    author: {
      type: String,
      ref: 'User'
    },
    description: String,
    views: { type: Number, default: 0 },
    like: [{}],
    status: { type: String, default: 'updating', enum: ['complete', 'updating']},
    chapOnWeek: Number,
    price: { type: Number, default: 0 },
    reviewManga: {
      type: String,
      ref: 'ReviewManga'
    },
    buyed: [{}],
    slug: String,
  },
  { collection: "Manga", timestamps: true }
);

const MangaModel = mongoose.model("Manga", MangaSchema);

module.exports = MangaModel;
