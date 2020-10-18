const mongoose = require('mongoose');

const schema = {
    newsstring:{
        type:String,
    },
    lastdate:{
        type: Date,
    },
    link:{
        type:String,
    }
}

const UserSchema =  new mongoose.Schema(schema);
module.exports = mongoose.model('News', UserSchema);
