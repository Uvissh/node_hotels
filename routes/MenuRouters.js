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
    router.get('/:TasteType',async(req,res)=>{// paramertized call of the person
      try{
        const TasteType =req.params.TasteType;//extract the work type from the url
        if(TasteType =='sour'||TasteTypeType =='sweet'|| TasteType=='bitter'){
          const response = await Menu.find({taste:TasteType});
          console.log('response fetched');
          res.status(200).json(response);
  
        }
        else{
          res.status(404).json({error:'invalid taste type'});
  
        }
  
      }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server errror'});
  
      }
     })
    // comment added for testing

    module.exports= router;
    

