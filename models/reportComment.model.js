const mongoose = require('./dbConnection');

const reportCommentSchema = mongoose.Schema({
    idComment: { type: String, ref: 'Comment' },
    userID: { type: 'string', ref: 'User' },
}, { collection: 'reportComment', timestamps: true })

const ReporCommenttModel = mongoose.model("reportComment", reportCommentSchema);

module.exports = ReporCommenttModel;
