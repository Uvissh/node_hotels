const express= require('express');
const router = express.Router();
const Menu = require('./../models/MenuItem');

router.post('/',async(req,res)=>{
    try{
    const data =req.body;//assuming the request body constains the person data
    // create a new person document using the mongoose model
    const newMenuItem =new MenuItem(data);
    const response = await newMenuItem.save();
    console.log("data saved of menu");
    res.status(200).json(response);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'internal ki server error'});
    }
  
    })

    module.exports= router;
    