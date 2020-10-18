const mongoose = require('mongoose');

const schema = {
      level: {
        type: Number,
      },
      questionstring:{
          type:String,
      },
      option:{
           a:{
                type:String,
           }, 
           b:{
                type :String,
           },
           c:{
                type :String,
           },
           d:{
                type :String,
           }
      },
      answer:{
        type :String,
      },
      image:{
           type:String,
      },
    };

const UserSchema =  new mongoose.Schema(schema);
module.exports = mongoose.model('Question', UserSchema);

