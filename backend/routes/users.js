var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');

router.post('/register',  (req,res,next)=>{
  var user = new User({
    email: req.body.email,
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    creation_dt: Date.now()
  });

  let promise = user.save();

  promise.then((doc)=>{
    return res.status(200).json(doc);
  })

  promise.catch((err)=>{
    return res.status(501).json({message: 'Error registering user.'})
  })
})

router.post('/login', (req,res,next)=>{
   let promise = User.findOne({email:req.body.email}).exec();

   promise.then((doc)=>{
    if(doc) {
      if(doc.isValid(req.body.password)){
          // generate token
          let token = jwt.sign({username:doc.username},'secret', {expiresIn : '1h'});
          
          let data = {
            user : doc,
            token : token
          }
          return res.status(200).json(data);

      } else {
        return res.status(501).json({message:' Invalid Credentials'});
      }
    }
    else {
      return res.status(501).json({message:'User email is not registered.'})
    }
   });

   promise.catch((err)=>{
     return res.status(501).json({message:'Some internal error'});
   })
})


module.exports = router;
