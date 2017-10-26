const { Schema } = require('mongoose');

module.exports = new Schema({
  content: String,
  tags: [String],
});
