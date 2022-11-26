const mongoose = require('./dbConnection');

const BuyedSchema = mongoose.Schema({
    userID: { type: 'string', ref: 'User', required: true },
    mangaID: { type: 'string', ref: 'Manga', required: true },
}, { collection: "buyed", timestamps: true });
const BuyedModel = mongoose.model("buyed", BuyedSchema);

module.exports = BuyedModel;