const db = require("../models");
const _ = require('lodash');
const User = db.user;
const Product = require('../models/Product');
const Notification = require('../models/Notification');
const Offer = require('../models/Offer');
const Order = require('../models/Order');

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.superadminBoard = (req, res) => {
  res.status(200).send("Superdmin Content.");
};

exports.pastryBoard = (req, res) => {
  res.status(200).send("Pastry Content.");
};
exports.get = async (req, res) =>{
  res.send(await User.find({visible : "visible"}));
}
exports.getAll = async (req, res) =>{
  res.send(await User.find());
}

exports.getPasteries = async (req, res) =>{
  res.send(await User.find({ visible : "visible", 
  role : "pâtisserie"}, function(err) { if (err) return err; }));
}

exports.updateUser = async (req, res) => {
  //verify values
  if (!req.body) {
    return res.status(400).send({
        message: "can't update out of nothing dumb dumb!"
    });
}
  //verify user existance in database.
  let user = await User.findById(req.params.id);
    if (!user)
        return res.status(404).send('user not found');
  
  user = _.merge(user,req.body);
  user = await user.save();
  res.send(user);
}
exports.getUserById = async (req, res) =>{
  let user = await User.findById(req.params.id);
    if (!user)
        return res.status(404).send('user not found');
  res.send(user);
}
exports.getUserByUsername = async (req, res) =>{
  let user = await User.find({username : req.params.username});
    if (!user)
        return res.status(404).send('user not found');
  res.send(user);
}

exports.deletebyUsername = async (req, res) => {
    //Delete user
  /*let user = await User.deleteOne({username : req.params.username});
  if(!user)
      return res.status(404).send('user not found')
  res.send("user deleted!");*/

  //Make it invisible
 

  // let nots = await Notification.find( {_user : _user[0]._id} );
  // if ( nots.length > 0 )
  // {
  //   await nots.map((n) => 
  //   {
  //     let note =  Notification.findById(n._id);
  //     if (!note)
  //     {
  //       console.log ("error while removing user notifications ...")
  //     }
  //     else
  //     {
  //       note.visible = "invisible"
  //       note =  note.save();
  //     }
  //   });
  // }

  // if (_user[0].role == "utilisateur")
  // {
  //   let orders = await Order.find( {_client : _user[0]._id} );
  //   if ( orders.length > 0 )
  //     {
  //       await orders.map((o) => 
  //       {
  //         let order = Order.findById(o._id);
  //         if (!order)
  //         {
  //           console.log ("error while removing user orders ...")
  //         }
  //         else
  //         {
  //           order.visible = "invisible"
  //           order = order.save();
  //         }
  //       });
  //     }
  // }
 
  // if (_user[0].role == "pâtisserie") 
  //   {
  //     let orders = await Order.find( {_pastry : _user[0]._id} );
  //       if ( orders.length > 0 )
  //         {
  //           await orders.map((o) => 
  //           {
  //             let order = Order.findById(o._id);
  //             if (!order)
  //             {
  //               console.log ("error while removing user orders ...")
  //             }
  //             else
  //             {
  //               order.visible = "invisible"
  //               order = order.save();
  //             }
  //           });
  //         }
      
  //     let offers = await Offer.find( {_pastry : _user[0]._id} );
  //         if ( offers.length > 0 )
  //           {
  //             await offers.map((o) => 
  //             {
  //               let offer = Offer.findById(o._id);
  //               if (!offer)
  //               {
  //                 console.log ("error while removing user offers ...")
  //               }
  //               else
  //               {
  //                 offer.visible = "invisible"
  //                 offer = offer.save();
  //               }
  //             });
  //           }
      
  //     let products = await Product.find( {_pastry : _user[0]._id} );
  //         if ( products.length > 0 )
  //           {
  //             await products.map((p) => 
  //             {
  //               let product = Product.findById(p._id);
  //               if (!product)
  //               {
  //                 console.log ("error while removing user products ...")
  //               }
  //               else
  //               {
  //                 product.visible = "invisible"
  //                 product = product.save();
  //               }
  //             });
  //           }
  //   }
  //let _user = await User.find({username : req.params.username});
  let user = await User.findById(req.params.id);
  if(!user)
    return res.status(404).send('user not found')

  user.visible = "invisible"
  user = await user.save();
  res.send(user);
}

exports.deleteUserOrders = async (req, res) => {

/*let user = await User.find({username : req.params.username});
if(!user)
  return res.status(404).send('user not found')*/

var order = null;
let orders = await Order.find( { $or: [ {_client : req.params.id}, { _pastry :  req.params.id } ] });
    if ( orders.length > 0 )
      {
        orders.map( async (o) => 
        {
          order = await Order.findById(o._id);
          if (!order)
          {
              return res.status(404).send('order not found')
          }
          order.visible = "invisible"
          order = await order.save();
          
        });
      }
      res.send('orders deleted');
}

exports.deleteUserOffers = async (req, res) => {

  /*let user = await User.find({username : req.params.username});
  if(!user)
    return res.status(404).send('user not found')*/
  
  var offer = null;
  let offers = await Offer.find( { _pastry :  req.params.id } );
      if ( offers.length > 0 )
        {
          offers.map( async (o) => 
          {
            offer = await Offer.findById(o._id);
            if (!offer)
            {
                return res.status(404).send('offer not found')
            }
            offer.visible = "invisible"
            offer = await offer.save();
            
          });
        }
        res.send('offers deleted');
  }
  
exports.deleteUserProducts = async (req, res) => {

    /*let user = await User.find({username : req.params.username});
    if(!user)
      return res.status(404).send('user not found')*/
    
    var product = null;
    let products = await Product.find( { _pastry :  req.params.id } );
        if ( products.length > 0 )
          {
            products.map( async (p) => 
            {
              product = await Product.findById(p._id);
              if (!product)
              {
                  return res.status(404).send('product not found')
              }
              product.visible = "invisible"
              product = await product.save();
              
            });
          }
          res.send('products deleted');
    }

    exports.deleteUserNotifications = async (req, res) => {

      /*let user = await User.find({username : req.params.username});
      if(!user)
        return res.status(404).send('user not found')*/
      
      var notification = null;
      let notifications = await Notification.find( { _user :  req.params.id } );
          if ( notifications.length > 0 )
            {
              notifications.map( async (n) => 
              {
                notification = await Notification.findById(n._id);
                if (!notification)
                {
                    return res.status(404).send('notification not found')
                }
                notification.visible = "invisible"
                notification = await notification.save();
                
              });
            }
            res.send('notifications deleted');
      }
    

