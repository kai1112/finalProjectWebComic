const mongoose = require('./dbConnection');

const HistorySchema = mongoose.Schema({
    mangaID: { type: String, ref: 'Manga' },
    userID: { type: String, ref: 'User' },
}, { collection: "History", timestamps: true })

const HistoryModel = mongoose.model('History', HistorySchema)
module.exports = HistoryModel