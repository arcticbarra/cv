const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PersonSchema = new Schema({
  name: { type: String },
  age: { type: Number },
  born: { type: String },
  timeline: { type: String },
  alliegance: [{ type: String }],
  playedBy: { type: String },
  titles: [{ type: String }],
  father: { type: String },
  mother: { type: String },
  spouse: { type: String }
});

module.exports = mongoose.model('Person', PersonSchema);
