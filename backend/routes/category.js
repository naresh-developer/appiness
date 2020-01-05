var express = require('express');
var router = express.Router();
var Category = require('../models/category');
var Product = require('../models/product');
var jwt = require('jsonwebtoken');
var async = require("async");

router.post('/create',  (req,res,next)=>{
  var category = new Category({
    name: req.body.name,
    code: req.body.code
  });

  let promise = category.save();

  promise.then((val)=>{
    return res.status(200).json(val);
  })

  promise.catch((err)=>{
    return res.status(501).json({message: 'Something went wrong.'})
  })
})

router.get('/list', (req,res,next)=>{
   let promise = Category.aggregate(
    [
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "category_id",
          as: "products"
        }
      },
      {
        $project:
        {
          _id: 1,
          name: 1,
          code:1,
          totalProducts: {$size: "$products"},
          products: "$products"
        }
      }
    ]
  ).exec();

   promise.then((val)=>{
    if(val) {
      return res.status(200).json({message : 'category list', data: val});
    }
    else {
      return res.status(501).json({message:'No record found.', data: []})
    }
   });
   promise.catch((err)=>{ 
     return res.status(501).json({message:'Something went wrong.'});
   })
})

router.get('/delete/:id', (req,res,next)=>{

  async.waterfall([
    (callback)=>{
      debugger
        Category.remove({'_id':req.params.id}).exec((error, val)=>{
          if(error){
            callback(error)
          } else {
            callback(null, req.params.id)
          }
        });

    },
    (category, callback)=>{
      Product.find({category_id: category}).exec(( error, valData)=>{
        if(error){
          callback(error)
        } else{
          callback(null, valData)
        }
      })
    },
    (productsVal, callback)=>{      
      let removeProdcts = [];
      productsVal.forEach(data=>{
        removeProdcts.push({
          name:data.name,
          code:data.code,
        })
        Product.remove({_id:data._id}).exec();
      });
      callback(null, removeProdcts);
    }],  (err, result)=>{
      if(err){

        return res.status(501).json({message:'Something went wrong.', data:err});    
      }
      return res.status(200).json({message : 'Remove Category Successfully.', 'Removed Products': result});
    }
)
})



module.exports = router;
