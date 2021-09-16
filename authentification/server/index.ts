const express = require("express");
const app= express();
const router= express.Router();
app.use(express.json());
const mongoose=require('mongoose');
const {check,validationResult}= require('express-validator');
const jwt= require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const verifyToken= require('./middleware/protectRoute');

require('dotenv').config(); //to hide passwords

mongoose.connect(`mongodb://raoufmadani-memberapp:${process.env.PASSWORD}@cluster0-shard-00-00.4kbqq.mongodb.net:27017,cluster0-shard-00-01.4kbqq.mongodb.net:27017,cluster0-shard-00-02.4kbqq.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-iq58od-shard-0&authSource=admin&retryWrites=true&w=majority`)
.then(() =>{
    app.listen(3000,()=> console.log('Server is on'));
})
.catch((err: any)=>console.log(err));

const Member= require('./models/Member');

// Verify memberInfo validity during registration
const validation= [check('name').isLength({min:3}).withMessage('Please provide your name!'),
check('email').isEmail().withMessage('Please provide a valid email!'),check('password').isLength({min:6}).withMessage('Your password should contain minimum 6 letters!')];

// Verify memberInfo validity during login
const validationLogin= [check('email').isEmail().withMessage('Please provide a valid email!'),check('password').isLength({min:6}).withMessage('Your password should contain minimum 6 letters!')];

// post request to register a new member, asynchronous function
router.post('/register', validation,async (req:any, res:any)=>{

    //catch errors from memberInfo validation
    const error= validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
      }

    // Verify if the member email already exists in the database
      const memberExist= await Member.findOne({email:req.body.email});
      if(memberExist) return res.status(400).send({success:false,message:'Email already exists!'});

    //hasing member password using bcrypt
    const rounds= await bcrypt.genSalt();
    const hashpass= await bcrypt.hash(req.body.password,rounds);
    
    
    //creating a new instance
    const newMember = new Member({
       name: req.body.name,
       email:req.body.email,
       password:hashpass,
       address:req.body.address,
       birthdate:req.body.birthdate,
       entranceDate:req.body.entranceDate
    });

    try{
        const memberInfo = await newMember.save();

        //generate token once the member has registered to his account
        const token = jwt.sign({_id:newMember._id,email:newMember.email},process.env.SECRET);

        res.send({success:true,data:memberInfo,token});

    } catch(err){
        //catch the error
        console.log({success:false,err});
    }
 });




//post request to login a member if his account exists
router.post('/login', validationLogin, async (req: any, res: any)=>{
    
    //catch errors from memberInfo validation
    const error= validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
      }

    // we need to check if the email exists in the database
    const member = await Member.findOne({email:req.body.email});
    if(!member) return res.status(404).send({success:false,message:"You're not a member, don't miss with us"});

    // check if the password is correct
    const correctPass= await bcrypt.compare(req.body.password,member.password);
    if(!correctPass) return res.status(404).send({success:false,messsage:"Your email or password is worng!"});
    
    //create plus assign a token
    const token = jwt.sign({_id:member._id,email:member.email},process.env.SECRET);
    res.header('auth-token',token).send({success:true,message:`Hi ${member.name}, welcome back!`,token});
 });
 

 //update a member (post request)
 router.patch('/updateMember/:id',async(req: any, res: any)=>{

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

 //display our members list
 router.get('/membersList',(req:any,res:any)=>{
    Member.find({},(err:any,members:any)=>{
         if(err){
             res.send(err);
             return;
         }
         res.send(members);
         
    });
 });

 //protecting the profile route for members
 app.get('/api/member/profile',verifyToken,(req:any,res:any)=>{
     res.send({success:true,data:req.member});
 });

 app.use('/api/users',router); 
