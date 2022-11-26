const mongoose = require('./dbConnection');

const ReviewChapterSchema = mongoose.Schema({
  chap: { type: Number, default: 1 },
  title: String,
  content: String,
  views: Number,
  stautus: { type: String, enum: ['posted', 'review'], default: 'review' },
  mangaID: {
    type: String,
    ref: "ReviewManga", required: true
  },
  slug: String
}, { collection: "ReviewChapter", timestamps: true });
const ReviewChapterModel = mongoose.model("ReviewChapter", ReviewChapterSchema);

module.exports = ReviewChapterModel;