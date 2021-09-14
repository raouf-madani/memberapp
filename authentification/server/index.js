const express = require('express');
const app= express();
const router= express.Router();
app.use(express.json());
const mongoose=require('mongoose');
const {check,validationResult}= require('express-validator');
const jwt= require("jsonwebtoken");

require('dotenv').config(); //to hide passwords

mongoose.connect(`mongodb://raoufmadani-memberapp:${process.env.PASSWORD}@cluster0-shard-00-00.4kbqq.mongodb.net:27017,cluster0-shard-00-01.4kbqq.mongodb.net:27017,cluster0-shard-00-02.4kbqq.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-iq58od-shard-0&authSource=admin&retryWrites=true&w=majority`)
.then(result =>{
    app.listen(3000,()=> console.log('Server is on'));
})
.catch(err=>console.log(err));

const Member= require('./models/Member');

// Verify memberInfo validity during registration
const validation= [check('name').isLength({min:3}).withMessage('Please provide your name!'),
check('email').isEmail().withMessage('Please provide a valid email!')];

// Verify memberInfo validity during login
const validationLogin= [check('email').isEmail().withMessage('Please provide a valid email!')];

// post request to register a new member, asynchronous function
router.post('/register', validation,async (req,res)=>{

    //catch errors from memberInfo validation
    const error= validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
      }

    //creating a new instance
    const newMember = new Member({
       name: req.body.name,
       email:req.body.email,
       address:req.body.address,
       birthdate:req.body.birthdate,
       entranceDate:req.body.entranceDate
    });

    try{
        const memberInfo = await newMember.save();
        res.send(memberInfo);
    } catch(err){
        //catch the error
        console.log(err);
    }
 });




//post request to login a member if his account exists
router.post('/login', validationLogin, async (req,res)=>{
    
    //catch errors from memberInfo validation
    const error= validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
      }

    // we need to check if the email exists in the database
    const member = await Member.findOne({email:req.body.email});
    if(!member) return res.status(404).send("You're not a member, don't miss with us");
    
    //create plus assign a token
    const token = jwt.sign({_id:member._id,email:member.email},process.env.SECRET);
    res.header('auth-token',token).send({message:`Hi ${member.name}, welcome back!`,token});
 });

 //update a member (post request)
 router.patch('/updateMember/:id',async(req,res)=>{

  //catch errors from memberInfo validation
  /*const error= validationResult(req);*/
 /* if (!error.isEmpty()) {*/
     // return res.status(400).json({ error: error.array() });
  // }
  
  try{
   
   const updatedMember= await Member.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.send(updatedMember);

  }catch(err){
      console.log(err);
  }


 });

 app.use('/api/users',router); 