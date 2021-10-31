var mongoose = require('mongoose')
, Schema = mongoose.Schema

var orderSchema = Schema({
    paiement_methode       :
    {
     type    : String,
     enum    : ['à la livraison','à la réception'],
     default : 'à la livraison'
    },
    state       :
   {
    type    : String,
    enum    : ['en cours','servie','annulée'],
    default : 'en cours'
   },
   _offer  : {type: Schema.Types.ObjectId, ref: 'Offer' },
   _pastry  : {type: Schema.Types.ObjectId, ref: 'User' },
   _client  : {type: Schema.Types.ObjectId, ref: 'User' },
   dateOfCreation : String,
   visible: {
    type: String,
    enum: ["visible", "invisible"],
    default: "visible",
    },
   dueDate : String
});

var Order  = mongoose.model('Order', orderSchema);

module.exports = Order;