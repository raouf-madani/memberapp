const express = require('express');
const app= express();
const router= express.Router();
app.use(express.json());
const mongoose=require('mongoose');
const {check,validationResult}= require('express-validator');

mongoose.connect('mongodb://raoufmadani-memberapp:zibrdTsY1eBHe7pc@cluster0-shard-00-00.4kbqq.mongodb.net:27017,cluster0-shard-00-01.4kbqq.mongodb.net:27017,cluster0-shard-00-02.4kbqq.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-iq58od-shard-0&authSource=admin&retryWrites=true&w=majority')
.then(result =>{
    app.listen(3000,()=> console.log('Server is on'));
})
.catch(err=>console.log(err));

const Member= require('./models/Member');

// Verify memberInfo validity
const validation= [check('name').isLength({min:3}).withMessage('Please provide your name!'),
check('email').isEmail().withMessage('Please provide a valid email!')];

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





router.post('/login', (req,res)=>{
    res.send('Login');
 });

 app.use('/api/users',router); 