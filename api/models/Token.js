const mongoose = require('mongoose');

const schema = {
      token: {
        type: String
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      created_at: {
        type: Date,
        default: Date.now
      },
    };

const UserSchema =  new mongoose.Schema(schema);
module.exports = mongoose.model('token', UserSchema);

