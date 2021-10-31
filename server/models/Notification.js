var mongoose = require('mongoose')
, Schema = mongoose.Schema

var notificationSchema = Schema({
  subject     : String,
  message     : String,
  _user       : {type: Schema.Types.ObjectId, ref: 'User' }, //one notification can be sent by one user.
  Date        : String,
  state       :
  {
   type    : String,
   enum    : ["Traité","en cours"],
   default : 'en cours'
  },
  visible: {
    type: String,
    enum: ["visible", "invisible"],
    default: "visible",
  },
  nonUserName     : String,
  nonUserEmail    : String
});

const Notification  = mongoose.model('Notification', notificationSchema);

module.exports = Notification;