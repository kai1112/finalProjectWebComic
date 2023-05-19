// <<<<<<< HEAD
const mongoose = require('mongoose');
const mongooseDBLinkk = process.env.mongodblink
mongoose.connect(mongooseDBLinkk)
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1/final-project');
// =======
// mongoose.connect(process.env.mongodblink);
// >>>>>>> 0c61dcde9cb4254b4645694ea6f0d19fa0ef82d4

module.exports = mongoose;