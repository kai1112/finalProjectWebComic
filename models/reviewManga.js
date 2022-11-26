const mongoose = require("./dbConnection");

const ReviewMangaSchema = mongoose.Schema(
  {
    avatar: String,
    backgroud_avatar: String,
    category: [{}],
    name: { type: String, required: true },
    author: { type: String, ref: 'User', required: true },
    description: String,
    views: Number,
    like: Number,
    price: { type: Number, default: 0 },
    stautus: { type: String, enum: ['posted', 'review'], default: 'review' },
    slug: String
  },
  { collection: "ReviewManga", timestamps: true }
);

const ReviewMangaModel = mongoose.model("ReviewManga", ReviewMangaSchema);

module.exports = ReviewMangaModel;
