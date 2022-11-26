const mongoose = require('./dbConnection');

const reportSchema = mongoose.Schema({
    content: String,
    userID: { type: 'string', ref: 'User' },
    mangaID: { type: 'string', ref: 'Manga' },
    status: { type: 'string', enum: ['watched', 'not seen'], default: 'not seen' }
}, { collection: 'report', timestamps: true })

const ReportModel = mongoose.model("report", reportSchema);

module.exports = ReportModel;
