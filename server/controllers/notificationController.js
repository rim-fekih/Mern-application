const _ = require('lodash');
const Notification = require('../models/Notification');
const db = require("../models");
const User = db.user;

exports.get = async (req, res) =>{
    let _notification = await Notification.find({visible : "visible"});
    let notification = []
    for(let i=0;i<_notification.length;i++) {
        var user =  await User.findById(_notification[i]._user);
        if(!user) {
            notification[i] = {
                ID: _notification[i]._id,
                userName: _notification[i].nonUserName,
                userEmail:  _notification[i].nonUserEmail,
                userPhone: "pas de numéro de téléphone.",
                subject : _notification[i].subject,
                message : _notification[i].message,
                Date: _notification[i].Date,
                state: _notification[i].state
            }
        }
        else
        {
            notification[i] = {
                ID: _notification[i]._id,
                userName: user.username,
                userEmail:  user.email,
                userPhone: user.phone,
                subject : _notification[i].subject,
                message : _notification[i].message,
                Date: _notification[i].Date,
                state: _notification[i].state
        }
        
        }
    }
    res.send(notification);
}

exports.getById = async (req, res) =>{
    let notification = await Notification.findById(req.params.id);
        if (!notification)
        {
            return res.status(404).send("notification not found");
        }
        res.send(notification);
}

exports.create = async (req, res) => {
    const today = new Date();
    let prefixDay = ""
    let prefixMonth = ""
    if (new Date().getUTCDate() < 10)
      prefixDay = "0"
    else
      prefixDay = ""
    if (new Date().getMonth() < 10)
      prefixMonth = "0"
    else
      prefixMonth = ""
    const newDate = prefixDay + today.getUTCDate() + "/" + prefixMonth + today.getUTCMonth() + "/" + today.getFullYear();

    let notification = new Notification(_.pick(req.body,'subject','message','_user','nonUserName','nonUserEmail',Date.now));
    try {
        notification.Date = newDate;
        notification = await notification.save();
    } catch (error) {
        res.status(400).send("Save in DB Error"+ error.message)
    }
    
    res.send(notification);
};

exports.update = async (req, res) => {
    //verify values
    if (!req.body) {
        return res.status(400).send({
            message: "can't update out of nothing dumb dumb!"
        });
    }

    //verify product avaibility
    let  notification = await Notification.findById(req.params.id);
    if (!notification)
        return res.status(404).send('notification not found');

    notification = _.merge(notification,req.body);
    notification = await notification.save();
    res.send(notification.state);
}

exports.delete = async (req, res) => {
    let notification = await Notification.findById(req.params.id);
    if(!notification)
        return res.status(404).send('notification not found')
    notification.visible = "invisible";
    notification = await notification.save();
    res.send(notification)
}