const app =require('../../api');

class NewsService{ 
    
    create(where){
        return app.models.News.create(where)
    }
    getOne(where){
        return app.models.News.findOne(where);
    }
    getAll(where) {
        return app.models.News.find(where) 
    }
    update(where, model) {
        return app.models.News.findOneAndUpdate(where, model, { new: true })
    }
    
}

module.exports = new NewsService()