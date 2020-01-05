var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var jwt = require('jsonwebtoken');

router.post('/create',  (req,res,next)=>{
  var product = new Product({
    name: req.body.name,
    code: req.body.code,
    category_id:req.body.category_id
  });

  let promise = product.save();

  promise.then((val)=>{
    return res.status(200).json(val);
  })

  promise.catch((err)=>{
    return res.status(501).json({message: 'Something went wrong.'})
  })
})

router.get('/list', (req,res,next)=>{
   let promise = Product.find().populate('category_id').exec();

   promise.then((val)=>{
    if(val) {
      return res.status(200).json({message : 'Product list', data: val});
    }
    else {
      return res.status(501).json({message:'No record found.', data: []})
    }
   });
   promise.catch(function(err){ 
     return res.status(501).json({message:'Something went wrong.'});
   })
})



module.exports = router;
