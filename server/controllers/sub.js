const Sub = require('../models/sub');
const slugify = require('slugify');


exports.create = async (req, res) => {
    console.log("controller req.body output-->",req.body.name)
    try{
        const {name, parent} = req.body;
        const category = await Sub.create({name, parent, slug: slugify(name).toLowerCase()});
        res.json(category)
        // console.log("Success")
    } catch (err) {
        res.status(400).send("Create sub category failed")
        console.log("error 400, create sub category failed", err.message)
    }

}
exports.list = async (req, res) => {
    Sub.find({}).sort({createdAt: -1})
    .then((list) =>{
        res.json(list)
    })
    .catch((err)=>{
        console.log("controller error list-->", err.message)
    })
}
exports.read = async (req, res) => {
    await Sub.findOne({slug: req.params.slug})
    .then((data)=>{
        let category = data;
        res.json(category)
    });


}
exports.update = async (req, res) => {
    const {name, parent} = req.body;
    try{
        await Sub.findOneAndUpdate(
            {slug: req.params.slug},
            {name: name, parent, slug: slugify(name)},
            {new: true}
            ).then((data)=>{
                res.json(data)
            })
            .catch((err)=>{
                console.log('Category update error')
            })
    } catch (err){
        res.status(400).send("Create and update failed")
    }
}
exports.remove = async (req, res) => {
    try{
        await Sub.findOneAndDelete({slug: req.params.slug})
        .then((data) =>{
            res.json(data)
        })
    } catch (err) {
        res.status(400).send("Create category failed")
        console.log("error 400, create category failed", err.message)
    }
}