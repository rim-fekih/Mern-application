var mongoose = require('mongoose')
, Schema = mongoose.Schema

var categorySchema = Schema({
  title       : String,
  description : String,
  products    : 
  [
      { type: Schema.Types.ObjectId, ref: 'Product' } // a category has 1 or multiple products.
  ],
  visible: {
    type: String,
    enum: ["visible", "invisible"],
    default: "visible",
  },
});

var Category  = mongoose.model('Category', categorySchema);

module.exports = Category;
