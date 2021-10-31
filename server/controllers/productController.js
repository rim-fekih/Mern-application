const _ = require('lodash');
const Product = require('../models/Product');
const Category = require('../models/Category');

//Searching
exports.get = async (req, res) =>{
    res.send(await Product.find({visible : "visible"}));
}

exports.getById = async (req, res) =>{
    let product = await Product.findById(req.params.id);
        if (!product)
        {
            return res.status(404).send("product not found");
        }
        res.send(product);
}

exports.create = async (req, res) => {
    let product = new Product(_.pick(req.body,'title','description','price','_category'));
    try {
        product = await product.save();
    } catch (error) {
        res.status(400).send("Save in DB Error"+ error.message)
    }
    res.send(product);
};

exports.update = async (req, res) => {
    //verify values
    if (!req.body) {
        return res.status(400).send({
            message: "can't update out of nothing dumb dumb!"
        });
    }

    //verify product avaibility
    let product = await Product.findById(req.params.id);
    if (!product)
        return res.status(404).send('product not found');

    product = _.merge(product,req.body);
    product = await product.save();
    res.send(product);
}

exports.delete = async (req, res) => {
    let product = await Product.findById(req.params.id);
    if(!product)
        return res.status(404).send('product not found')
    product.visible = "invisible";
    product = await product.save();
    res.send(product)
}

