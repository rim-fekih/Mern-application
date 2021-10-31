var mongoose = require('mongoose')
, Schema = mongoose.Schema

var offerSchema = Schema({
  _pastry  : {type: Schema.Types.ObjectId, ref: 'User' },
  title       : String,
  description : String,
  price       : Number,
  newPrice : Number,
  products    : 
  [
      { type: Schema.Types.ObjectId, ref: 'Product' } //An offer is made with 1 or more products.
  ],
  state       :
   {
    type    : String,
    enum    : ['publié','en pause','prêt'],
    default : 'prêt'
   },
   img: {
    type : String,
    default : null
  },
   publishDate : String,
   publishTime : String,
   endPublishTime: String,
   priority   : 
   {
    type    : String,
    enum    : ['haute','moyenne','basse'],
    default : 'moyenne'
   },
   visible: {
    type: String,
    enum: ["visible", "invisible"],
    default: "visible",
  },
});

var Offer  = mongoose.model('Offer', offerSchema);
module.exports = Offer;

