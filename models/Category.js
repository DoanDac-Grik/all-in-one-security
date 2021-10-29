const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Category = new Schema({
  name: { type: String, required: true, maxlength: 255},
  slug: {type: String, required: true, unique: true, maxlength: 255},
}, { timestamps: true });

module.exports = mongoose.model('Category', Category);