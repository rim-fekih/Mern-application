const _ = require('lodash');
const Category = require('../models/Category');

exports.get = async (req, res) =>{
    res.send(await Category.find({visible : "visible"}));
}

exports.getById = async (req, res) =>{
    let category = await Category.findById(req.params.id);
        if (!category)
        {
            return res.status(404).send("category not found");
        }
        res.send(category);
}

exports.create = async (req, res) => {

    let category = new Category(_.pick(req.body,'title','description','products'));
    try {
        category = await category.save();
    } catch (error) {
        res.status(400).send("Save in DB Error"+ error.message)
    }
    
    res.send(category);
};

exports.update = async (req, res) => {
    //verify values
    if (!req.body) {
        return res.status(400).send({
            message: "can't update out of nothing dumb dumb!"
        });
    }

    //verify product avaibility
    let  category = await Category.findById(req.params.id);
    if (!category)
        return res.status(404).send('category not found');

    category = _.merge(category,req.body);
    category = await category.save();
    res.send(category);
}

exports.delete = async (req, res) => {
    let category = await Category.findById(req.params.id);
    if(!category)
      return res.status(404).send('category not found')
  
    category.visible = "invisible"
    category = await category.save();
    res.send(category);
}