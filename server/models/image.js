const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  path: String,
  size: Number,
  mimetype: String,
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
