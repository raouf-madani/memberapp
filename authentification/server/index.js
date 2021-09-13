const express = require('express');
const app= express();
const router= express.Router();
app.use(express.json());
const mongoose=require('mongoose');

mongoose.connect('mongodb://raoufmadani-memberapp:zibrdTsY1eBHe7pc@cluster0-shard-00-00.4kbqq.mongodb.net:27017,cluster0-shard-00-01.4kbqq.mongodb.net:27017,cluster0-shard-00-02.4kbqq.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-iq58od-shard-0&authSource=admin&retryWrites=true&w=majority')
.then(result =>{
    app.listen(3000,()=> console.log('Server is on'));
})
.catch(err=>console.log(err));


app.get('/',(req,res)=>{
    res.send('Welcome to member app');
});
router.post('/register', (req,res)=>{
    res.send('register');
 });
router.post('/login', (req,res)=>{
    res.send('Login');
 });

 app.use('/api/users',router);