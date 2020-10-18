const app =require('../../api');
//const jwt = require('jsonwebtoken')
//const constants  = require('../../config/constants')

class SurveyService{ 
    
    create(where){
        console.log("asdf");
        return app.models.Survey.create(where)
    }
    getAll(where) {
        return app.models.Survey.find(where) 
    }
    
}

module.exports = new SurveyService()