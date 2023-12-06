const Category = require('../models/category');
const Sub = require('../models/sub');

const slugify = require('slugify');


exports.create = async (req, res) => {
    try{
        const {name} = req.body;
        const category = await Category.create({name, slug: slugify(name).toLowerCase()});
        res.json(category)
        // console.log("Success")
    } catch (err) {
        res.status(400).send("Create category failed")
        console.log("error 400, create category failed", err.message)
    }

}
exports.list = async (req, res) => {
    Category.find({}).sort({createdAt: -1})
    .then((list) =>{
        res.json(list)
    })
    .catch((err)=>{
        console.log("controller error list-->", err.message)
    })
}
exports.read = async (req, res) => {
    await Category.findOne({slug: req.params.slug})
    .then((data)=>{
        let category = data;
        res.json(category)
    });


}
exports.update = async (req, res) => {
    const {name} = req.body;
    try{
        await Category.findOneAndUpdate(
            {slug: req.params.slug},
            {name: name, slug: slugify(name)},
            {new: true}
            ).then((data)=>{
                res.json(data)
            })
            .catch((err)=>{
                console.log('sub Category update error')
            })
    } catch (err){
        res.status(400).send("sub Category update failed")
    }
}
exports.remove = async (req, res) => {
    try{
        await Category.findOneAndDelete({slug: req.params.slug})
        .then((data) =>{
            res.json(data)
        })
    } catch (err) {
        res.status(400).send("delete/remove sub category failed")
        console.log("error 400, create sub category failed", err.message)
    }
}

exports.getSubs = async (req, res) =>{
    await Sub.find({parent: req.params._id})
    .then((s)=>{
        res.json(s)
    })
    .catch((err) =>{
        console.log(err.message)
    })
}