const mongoose = require('mongoose');

const schema = {
    name:{
        type:String,
    },
    password:{
        type: String,
    },
    email:{
        type:String,
    },
    age:{
        type:String,
    },
    qualification:{
        type:String,
    },
    role: {
        type: Number,
        default: 2,
    },
    clearedlevel:{
        type: Number,
        default :0,
    },
    feedback :{
        type : String,
    }
}
const options = {
    versionKey: false,
    toObject: {
      transform: function (doc, ret) {
         delete ret.password;
      }
    },
    toJSON: {
      transform: function (doc, ret) {
         delete ret.password;
      }
    }
   };
  
const UserSchema =  new mongoose.Schema(schema,options);
module.exports = mongoose.model('User', UserSchema);
