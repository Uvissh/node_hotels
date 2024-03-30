const express = require('express')
const app = express();
const db =  require('./db');
const person= require('./models/Person');
const MenuItem = require('./models/MenuItem');
const bodyParser = require('body-parser');
app.use(bodyParser.json());//stores in req.body
 require('dotenv').config();
 const PORT = process.env.PORT || 3000;


app.get('/', function (req, res) {
  res.send('Hello World')
})
app.get('/Menu',function(req,res){
  res.send('chicken tikka')
})


 app.post('/Person',async(req,res)=>{
  try{
  const data =req.body;//assuming the request body constains the person data
  // create a new person document using the mongoose model
  const newPerson=new person(data);
  const response = await newPerson.save();
  console.log("data saved");
  res.status(200).json(response);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'internal ki server error'});
  }

  })


  app.post('/Menu',async(req,res)=>{
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
     app.get('/Person/:workType',async(req,res)=>{// paramertized call of the person
      try{
        const workType =req.params.workType;//extract the work type from the url
        if(workType =='chef'||workType =='manager'|| workType=='waiter'){
          const response = await person.find({work:workType});
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

     
const PersonRoute = require('./routes/PersonRoutes');
// use the routes
app.use('/Person',PersonRoute);  
const MenuRoute =require('./routes/MenuRouters');
app.use('/Menu',MenuRoute);
<<<<<<< HEAD



=======
>>>>>>> 44b55341ec2f04905ef71538fe9838c0bdd87df0
 


app.listen(3001,()=>{
  console.log('listening on port 3002');
})

