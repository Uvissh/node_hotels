const express= require('express');
const router = express.Router();
const Person= require('./../models/Person');
const person = require('./../models/Person');


router.post('/',async(req,res)=>{
    try{
    const data =req.body;//assuming the request body constains the person data
    // create a new person document using the mongoose model
    const newPerson=new Person(data);
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'internal ki server error'});
    }
})  
router.get('/:workType',async(req,res)=>{// paramertized call of the person
    try{
      const workType =req.params.workType;//extract the work type from the url
      if(workType =='chef'||workType =='manager'|| workType=='waiter'){
        const response = await Person.find({work:workType});
        console.log('response fetched');
        res.status(200).json(response);

      }
      else{
        res.status(404).json({error:'invalid work type'});

      }

    }catch(err){
      console.log(err);
      res.status(500).json({error:'internal server errror'});

    }
   })
    // for updation
    router.put('/:id',async(req,res)=>{

      try{
        const personId =req.params.id;//extract the id from the url parameter
        const updatedPersonData = req.body;//updated data for the person

         const response = await person.findByIdAndUpdate(personId,updatedPersonData,{
          new: true,//retuen the  updated document
          runValidators :true,//run mongoose validation
         })
          if(!response){
            return res.status(404).json({error:'person not found'});
          }
         console.log("data is updated");
         res.status(200).json(response);

      }catch(err){
        console.log(err);
        res.status(500).json({error:'interval  server error'});
      }

    })
     router .delete('/:id',async(req,res)=>{
      try{
        const personId =req.params.id;//extract the id from the url parameter
       
         const response = await person.findByIdAndDelete(personId);
        
         
          if(!response){
            return res.status(404).json({error:'person not found'});
          }
         console.log("data is delete");
         res.status(200).json({message:'person deleted sucessfully'});

      }catch(err){
        console.log(err);
        res.status(500).json({error:'interval  server error'});
      }


     })

    module.exports= router;