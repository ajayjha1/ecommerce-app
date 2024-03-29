const { reset } = require('nodemon');
const Product = require('../models/product')
const slugify = require('slugify');
const { query } = require('express');

// exports.create = async (req, res) => {
//     try {
//         console.log(req.body);
//         req.body.slug = slugify(req.body.title);
//          await new Product(req.body).then((data) =>{
//             const newProduct = data
//             res.json(newProduct)
//          })
//          .catch((err) =>{
//             console.log(err.message)
//          })
//     } catch (err) {
//         console.log('product.js controller error', err.message)
//         res.status(400).send('')
//     }
// }
exports.create = async (req, res) => {
    try {
      console.log(req.body);
      req.body.slug = slugify(req.body.title);
      const newProduct = await new Product(req.body).save();
      res.json(newProduct);
    } catch (err) {
      console.log('product.js controller error', err.message);
      
      res.status(400).json({
        err: err.message,
      })
    }
  }

  exports.listAll = async (req, res) =>{
    await Product.find({})
    .limit(parseInt(req.params.count))
    .populate('category', )
    .populate('subs')
    .sort([['createdAt', 'desc']])
    .then((data) =>{
      products = data
      res.json(products)
    })
    .catch((err) => {
       console.log(err.message)
    })
  }

  exports.remove = async (req, res) =>{
    console.log(req.params.slug)
    try{
      const deleted = await Product.findOneAndRemove({slug: req.params.slug}).exec()
      res.json(deleted)
    } catch (err) {
      console.log(err.message);
      res.status(400).send('Product delete failed', err.message)
    }
  }

  exports.read = async (req, res) =>{
    const product = await Product.findOne({slug: req.params.slug})
    .populate('category')
    .populate('subs')
    .exec();
    res.json(product)
  }

  exports.update =  async (req, res) =>{
    try{
      if(req.body.title){
        req.body.slug = slugify(req.body.title)
      }
      const update = await Product.findOneAndUpdate({slug: req.params.slug}, req.body, { new: true}).exec()
      res.json(update)
    } catch (err) {
      console.log("PRODUCT UPDATE ERROR --->", err)
      // res.status(400).send('Product update failed')
      res.status(400).json({
        err: err.message,
      });
    }
  }

  //Without Pagination
  // exports.list = async (req, res) =>{
  //   try{
  //     //created/updatedAt asec/desc, 3
  //     const {sort, order, limit} = req.body
  //     const products = await Product.find({})
  //     .populate('category')
  //     .populate('subs')
  //     .sort([[sort, order]])
  //     .limit(limit)
  //     .exec();
  //     res.json(products)
  //   } catch (err) {
  //     console.log(err.message)
  //   }
  // }

  //With Pagination
  exports.list = async (req, res) =>{
    try{
      //created/updatedAt asec/desc, 3
      const {sort, order, page} = req.body
      const currentPage = page || 1
      const perPage = 3
      const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate('category')
      .populate('subs')
      .sort([[sort, order]])
      .limit(perPage)
      .exec();
      res.json(products)
    } catch (err) {
      console.log(err.message)
    }
  }

  exports.productsCount = async (req, res) =>{
    let total = await Product.find({}).estimatedDocumentCount().exec();
    console.log(total)
    res.json(total)
  }

  exports.productStar = async (req, res) =>{
    const product = await Product.findById(req.params.productID).exec()
    const user = await User.findOne({email: req.user.email}).exec()
    const {star} = req.body

    //who is updating?
    //check if the currently logged in user have already added rating to this product?
    let existingRatingObject = product.ratings.find((ele) =>(ele.postedBy.toString() === user._id.toString()))

    // if user haven't left rating yet, push it
    if(existingRatingObject === undefined){
      let ratingAdded = Product.findByIdAndUpdate(
        product._id, 
        {
        $push: { ratings: {star: star, postedBy: user._id} },
      }, 
      {new: true}).exec();
      console.log('ratings added', ratingAdded)
      res.json(ratingAdded)
    } else {
      const ratingUpdated = await Product.updateOne(
        {
          ratings: { $elemMatch: existingRatingObject }
        },
        {$set: 
          {"rating.$.star": star}
        },
        {new: true}
      ).exec();
      console.log("ratingUpdated", ratingUpdated)
      res.json(ratingUpdated)
    }
    // if user have already left rating, update it
  }

  const handleQuery = async (req, res, query) =>{
    const products = await Product.find({$text: {$search:query}})
    .populate('category', '_id name')
    .populate('subs', '_id name')
    // .populate('postedBy', "_id name")
    .exec();

    res.json(products)
  }

  const handlePrice = async (req, res, price) =>{
    try{
      let products = await Product.find({
        price : {
          $gte: price[0],
          $lte: price[1],
        },
      })
    .populate('category', '_id name')
    .populate('subs', '_id name')
    // .populate('postedBy', "_id name")
    .exec();

    res.json(products)
    } catch (err) {
      console.log(err)
    }
  };

  const handleCategory = async(req, res,category) => {
    try{
      let products = await Product.find({ category })
      .populate('category', '_id name')
      .populate('subs', '_id name')
      // .populate('postedBy', "_id name")
      .exec();

      res.json(products);
    } catch (err) {
      console.log(err)
    }

  }
  //Search Filter
  exports.searchFilters = async (req, res) =>{
    const {query, price, category} = req.body
    if(query){
      console.log('query', query);
      await handleQuery(req, res, query);
    }

    // price [0, 10]
    if(price !== undefined) {
      console.log("price --->", price)
      await handlePrice(req, res, price)
    }

    if(category){
      console.log("category --->", category)
      await handleCategory(req, res, category)
    }
  }