const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ToolSchema = new Schema({
  name: { type: String, default: '', required: true },
  description: { type: String, default: '', required: true },
  image: { type: String, required: true },
  prices: { 
    type: [Number], 
    required: true,
    validate: [
      {
        validator: function(arr) {
          return arr.length <= 4;
        },
        message: 'Prices array cannot have more than 4 elements.'
      },
      {
        validator: function(arr) {
          return arr.every(price => typeof price === 'number');
        },
        message: 'All elements in prices array must be numbers.'
      }
    ]
  }
}, { timestamps: true });

const Tools = mongoose.model('Tool', ToolSchema);
module.exports = Tools;
