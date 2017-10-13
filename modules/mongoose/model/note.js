'use strict';

const mongoose = require('mongoose');
const noteSchema = require('../schema/note');

module.exports = mongoose.model('Note', noteSchema);
