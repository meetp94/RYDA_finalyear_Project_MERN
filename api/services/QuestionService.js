const app =require('../../api');

class QuestionService{ 
    
    add(where){
        return app.models.Question.create(where)
    }
    getOne(where){
        return app.models.Question.findOne(where);
    }
    getAll(where) {
        return app.models.Question.find(where) 
    }
    getAllforAdmin() {
        return app.models.Question.find() 
    }
    update(where, model) {
        return app.models.Question.findOneAndUpdate(where, model, { new: true })
    }
    delete(where){
        return app.models.Question.findOneAndDelete(where);
    }
    
}

module.exports = new QuestionService()