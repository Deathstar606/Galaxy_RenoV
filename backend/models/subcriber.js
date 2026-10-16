const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubSchema = new Schema({
  firstname: { type: String, default: '' },
  lastname: { type: String, default: '' },
  email: { type: String, required: true },
})

const Subcribers = mongoose.model('Subcriber', SubSchema);
module.exports = Subcribers;