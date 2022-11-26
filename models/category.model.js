const mongoose = require('./dbConnection');

const CategorySchema = mongoose.Schema({
    name: String,
    description: String,
    slug: String
}, { collection: "category", timestamps: true });
const CategoryModel = mongoose.model("category", CategorySchema);

module.exports = CategoryModel;