const jwt = require('jsonwebtoken');
require('dotenv').config(); //to hide passwords

//the token will be attached to the header of the request
module.exports= (req,res,next) =>{
   const token = req.header('auth-token');
   if(!token) return res.status(401).send('Access denied');

   //verify the token
   try{
     const verified = jwt.verify(token,process.env.SECRET);
     req.member= verified;
     next();
   } catch(err){
      res.status(400).send('Invalid token');
   }
}