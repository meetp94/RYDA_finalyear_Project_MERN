const app = require('..');

class QuestionController{
   /**
   * Add Question
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
    async create(req,res){
        
    let model =req.body;

    let levelQuestion = await app.services.QuestionService.getAll({level : model.level })
    console.log(levelQuestion.length);

    if(levelQuestion.length >= 10){
      return res.json({ flag: false, data: {}, message: 'Already Added 10 Question of this level', code: 500 })
    }
    
    if(!model.level && !model.questionstring && !model.option && !model.answer ) {
        return res.json({ flag: false, data: {}, message: 'Missing parameter', code: 500 })
      }
        try{
          
            let Question = await app.services.QuestionService.add(model);
           
            return res.json({data:Question, message:"Success", code: 200})
        }
        catch(e){
            console.log(e);
            return res.json({data:{}, message:"something went wrong", code: 500})
        }
    };
/**
   * Get Question Of particular Level
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
    async getAll(req, res) {
        let model =req.body;
        try {
            
            let Question = await app.services.QuestionService.getAll({level : model.level })

          return res.json({ flag: true, data: Question, message: 'success', code: 200 })
        }
        catch(e) {
          return res.json({ flag: false, data: {}, message: e.message, code: 500 })
        }
      }

      /**
   * Get all Question 
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
    async getAllforAdmin(req, res) {
     
      try {
          
          let Question = await app.services.QuestionService.getAllforAdmin()


        return res.json({ flag: true, data: Question, message: 'success', code: 200 })
      }
      catch(e) {
        return res.json({ flag: false, data: {}, message: e.message, code: 500 })
      }
    }
/**
   * Update Question
   * @param req
   * @param res
   * @returns {Promise<*>}
   */      
      async update(req, res) {
        let reqid = req.params.id;
        let model =req.body;
        
        try {
            
            let UpdatedModel = await app.services.QuestionService.update({_id : reqid} , model)

          return res.json({ flag: true, data: UpdatedModel, message: 'success', code: 200 })
        }
        catch(e) {
          return res.json({ flag: false, data: {}, message: e.message, code: 500 })
        }
      }

/**
   * Check Questions and Find result
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
      async result(req, res) {
        let model =req.body;
        let count=0,i=0,j=0;
        try {
          
            let id = Object.keys(model);
            let option = Object.values(model);
            let total={},level;
            
                var findmodel = await app.services.QuestionService.getAll({});
                level =findmodel[0].level;

                findmodel.forEach(function(element) {
                  id.forEach(function(element1) {
                      if(findmodel[i].id == id[j] && findmodel[i].answer == option[j] ){
                              count++;                      }
                      j++;  
                  });
                  j=0;
                  i++;
                });
            total = 10;
            let result = (count == 10) ? "Pass":"Fail";
            // Find Id By Token And update in user
            let { authorization: token } = req.headers;
            if (token && token.startsWith('bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
          }
          let userupdate = await app.models.Token.findOne({token})
            
          if(result == "Pass") { 
            await app.models.User.findOneAndUpdate({_id : userupdate.user}, {clearedlevel : level }, { new: true })
        }
          
          return res.json({ flag: true, data: {total , count, result}, message: 'success', code: 200 })
        }
        catch(e) {
            console.log(e);
          return res.json({ flag: false, data: {}, message: e.message, code: 500 })
        }
      }
/**
   * Delet Question
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async deletequestion(req, res) {
    let reqid = req.params.id;
    try {
        
        let Question = await app.services.QuestionService.delete({_id :reqid })
      if(Question == null){
        return res.json({ flag: true, data: "There is no Any Question", message: 'Failed', code: 200 })  
      }
      return res.json({ flag: true, data: "Question Deleted", message: 'success', code: 200 })
    }
    catch(e) {
      return res.json({ flag: false, data: {}, message: e.message, code: 500 })
    }
  }


}
module.exports = new QuestionController()