const app =require('..');
const jwt = require('jsonwebtoken')
const constants  = require('../../config/constants')

class AuthService{ 
    
    create(where){
        return app.models.User.create(where);
    }
    getOne(where){
        return app.models.User.findOne(where);
    }
    getAll(where) {
        return app.models.User.find(where) 
    }
    createAuthToken(user) {   
        let token = jwt.sign(user.toJSON(), constants.JWT_SECRET)
       return app.models.Token.create({ token, user });
    }
    removeAuthToken(token) {
        return app.models.Token.deleteOne({ token })
    }
    update(where, model) {
        return app.models.User.findOneAndUpdate(where, model, { new: true })
    }
    isValidEmail(email) {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        return regex.test(String(email).toLowerCase());
      }
    
      
}

module.exports = new AuthService()