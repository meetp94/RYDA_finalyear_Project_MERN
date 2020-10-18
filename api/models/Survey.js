const mongoose = require('mongoose');

const schema = {
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    school_name:{
        type: String,
    },
    country:{
        type:String,
    },
    gender:{
        type:String,
    },
    age: {
        type: Number,
    },
    que_1_ans:{
        type: String,
    },
    que_2_ans:{
        type: String,
    },
    que_3_ans:{
        type: String,
    },
}

const UserSchema =  new mongoose.Schema(schema);
module.exports = mongoose.model('Survey', UserSchema);
