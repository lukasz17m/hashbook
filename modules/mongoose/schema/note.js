const { Schema } = require('mongoose');

module.exports = new Schema({
  content: { type: String, required: true },
  tags: [{ type: String, required: true }],
});
