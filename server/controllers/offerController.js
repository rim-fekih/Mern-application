const _ = require('lodash');
const Offer = require('../models/Offer');
const db = require("../models");
const User = db.user;

exports.get = async (req, res) =>{
    let _offer = await Offer.find({visible : "visible"});
    let offer = []
    for(let i=0;i<_offer.length;i++) {
        var Pastry =  await User.findById(_offer[i]._pastry);
        offer[i] = {
            ID: _offer[i]._id,
            pastryId : _offer[i]._pastry,
            pastryIcon: Pastry.icon,
            pastryName: Pastry.username,
            pastryEmail:  Pastry.email,
            pastryPhone: Pastry.phone,
            postTitle: _offer[i].title,
            postDescription : _offer[i].description,
            offerPrice : _offer[i].price,
            Date: _offer[i].publishDate,
            status:  _offer[i].state,
            priority : _offer[i].priority,
            products : _offer[i].products
        }
    }
    res.send(offer);
}


exports.getPublished = async (req, res) =>{
    let _offer = await Offer.find({$and: [ {visible : "visible"}, {state : "publié"}]});
    let offer = []
    for(let i=0;i<_offer.length;i++) {
        var Pastry =  await User.findById(_offer[i]._pastry);
        var offerImg = _offer[i].img;
        if (!offerImg)
            offerImg = "default";
        offer[i] = {
            ID: _offer[i]._id,
            pastryId : _offer[i]._pastry,
            pastryIcon: Pastry.icon,
            pastryName: Pastry.username,
            pastryEmail:  Pastry.email,
            pastryPhone: Pastry.phone,
            postTitle: _offer[i].title,
            postDescription : _offer[i].description,
            oldPrice :  _offer[i].price,
            offerPrice : _offer[i].newPrice,
            Date: _offer[i].publishDate,
            status:  _offer[i].state,
            timeEnds: _offer[i].endPublishTime,
            img: offerImg
        }
    }
    res.send(offer);
}



exports.getById = async (req, res) =>{
    let _offer = await Offer.findById(req.params.id);
        if (!_offer)
        {
            return res.status(404).send("offer not found");
        }
    let offer = [];
    var Pastry =  await User.findById(_offer._pastry);
    offer = {
        ID: _offer._id,
        pastryId : _offer._pastry,
        pastryName: Pastry.username,
        pastryEmail:  Pastry.email,
        pastryPhone: Pastry.phone,
        postTitle: _offer.title,
        postDescription : _offer.description,
        offerPrice : _offer.price,
        Date: _offer.publishDate,
        status:  _offer.state,
        priority : _offer.priority,
        products : _offer.products
    }
    res.send(offer);
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
    let offer = new Offer(_.pick(req.body,'title','description','price','products','state','_pastry', 'endPublishTime'));
    try {
        offer.publishDate = newDate;
        offer = await offer.save();
    } catch (error) {
        res.status(400).send("Save in DB Error"+ error.message)
    }
    
    res.send(offer);
};

exports.update = async (req, res) => {
    //verify values
    if (!req.body) {
        return res.status(400).send({
            message: "can't update out of nothing dumb dumb!"
        });
    }

    //verify offer avaibility
    let  offer = await Offer.findById(req.params.id);
    if (!offer)
        return res.status(404).send('offer not found');

    offer = _.merge(offer,req.body);
    offer = await offer.save();
    res.send(offer);
}

exports.delete = async (req, res) => {
    let offer = await Offer.findById(req.params.id);
    if(!offer)
        return res.status(404).send('offer not found')
    offer.visible = "invisible";
    offer = await offer.save();
     res.send(offer)
}