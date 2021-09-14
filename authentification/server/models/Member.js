const mongoose= require('mongoose');

const memberInfo = new mongoose.Schema({
   name:{type: String, required:true},
   email:{type: String, required:true},
   address: String,
   birthdate:String,
   entranceDate:Date
});

module.exports = mongoose.model('Member',memberInfo);