const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Blog = new Schema({
  title: { type: String, required: true, unique: true, maxlength: 255},
  slug: {type: String, required: true, unique: true, maxlength: 255},
  short_description: { type: String, required: true, maxlength: 500 },
  content: { type: String, required: true },
  category_slug: {type: String, required: true, maxlength: 100},
  image: {type: String, required: true, maxlength: 400}
}, { timestamps: true });

module.exports = mongoose.model('Blog', Blog);