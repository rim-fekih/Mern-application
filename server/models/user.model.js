const mongoose = require("mongoose")
, Schema = mongoose.Schema

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    phone: {
      type : String,
      default : "pas de numéro de téléphone."
    },
    icon: {
      type : String,
      default : null
    },
    JoinDate: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    role: {
      type: String,
      enum: ["utilisateur", "superadmin", "pâtisserie"],
      default: "utilisateur",
    },
    status: {
      type: String,
      enum: ["active", "bloqué"],
      default: "active",
    },
    visible: {
      type: String,
      enum: ["visible", "invisible"],
      default: "visible",
    },
    pastryType : {
      type : String,
      default : "non défini",
    },
    pastryDescription : {
      type : String,
      default : "aucune description fournie",
    },
    orders    : 
    [
        { type: Schema.Types.ObjectId, ref: 'Order' } // a pastry has 0 or multiple orders.
    ],
    notifications    : 
    [
        { type: Schema.Types.ObjectId, ref: 'Notification' } // a pastry has 0 or multiple notifications.
    ],
    products    : 
    [
        { type: Schema.Types.ObjectId, ref: 'Product' } // a pastry has 0 or multiple products.
    ],
    offers    : 
    [
        { type: Schema.Types.ObjectId, ref: 'Offers' } // a pastry has 0 or multiple offers.
    ]
  })
);

module.exports = User;
