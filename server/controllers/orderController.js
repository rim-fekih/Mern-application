const _ = require('lodash');
const db = require("../models");
const Order = require('../models/Order');
const User = db.user;

exports.get = async (req, res) =>{
    let _order = await Order.find({visible : "visible"});
    let order = []
    for(let i=0;i<_order.length;i++) {
        var Pastry =  await User.findById(_order[i]._pastry);
        var Client = await User.findById(_order[i]._client);
        order[i] = {
            ID: _order[i]._id,
            pastryName: Pastry.username,
            pastryEmail:  Pastry.email,
            pastryPhone: Pastry.phone,
            ToClient: Client.username,
            clientPhone: Client.phone,
            Date: _order[i].dateOfCreation,
            Due_Date: _order[i].dueDate,
            status:  _order[i].state
        }
    }
    res.send(order);
}

exports.getById = async (req, res) =>{
    let _order = await Order.findById(req.params.id);
        if (!_order)
        {
            return res.status(404).send("order not found");
        }
        let order = []
        var Pastry =  await User.findById(_order._pastry);
        var Client = await User.findById(_order._client);
        order = {
            ID: _order._id,
            pastryName: Pastry.username,
            pastryEmail:  Pastry.email,
            pastryPhone: Pastry.phone,
            ToClient: Client.username,
            clientPhone: Client.phone,
            Date: _order.dateOfCreation,
            Due_Date: _order.dueDate,
            status:  _order.state
        }
        res.send(order);
}

exports.create = async (req, res) => {
    const today = new Date();
    let prefixHour = ""
    let prefixMinute = ""
    if (today.getMinutes() < 10)
        prefixMinute = "0"
    else
        prefixMinute = ""
    if (today.getHours() < 10)
        prefixHour = "0"
    else
        prefixHour = ""
    let order = new Order(_.pick(req.body,'paiement_methode','_offer','_pastry','_client'));
    try {
        order.dateOfCreation =  prefixHour + today.getHours() + " : " + prefixMinute +today.getMinutes();
        order.dueDate = prefixHour + (today.getHours() + 2).toString() + " : " + prefixMinute + today.getMinutes();
        order = await order.save();
    } catch (error) {
        res.status(400).send("Save in DB Error"+ error.message)
    }
    res.send(order);
};

exports.update = async (req, res) => {
    //verify values
    if (!req.body) {
        return res.status(400).send({
            message: "can't update out of nothing dumb dumb!"
        });
    }

    //verify order avaibility
    let  order = await Order.findById(req.params.id);
    if (!order)
        return res.status(404).send('order not found');
    order = _.merge(order,req.body);
    order = await order.save();
    res.send("order is " + order.state);
}

exports.delete = async (req, res) => {
    let order = await Order.findById(req.params.id);
    if(!order)
        return res.status(404).send('order not found')
    order.visible = "invisible";
    order = await order.save();
    res.send(order)
}