const app = require('..');

class SurveyController{
/**
   * Create a Survey
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
    async create(req,res){
        
    let model =req.body;
    if(!model) {
        return res.json({ flag: false, data: {}, message: 'Missing parameter', code: 500 })
      }
        try{
           
            let Survey = await app.services.SurveyService.create(model);
           
            return res.json({data:{}, message:"Success", code: 200})
        }
        catch(e){
            console.log(e);
            return res.json({data:{}, message:"something went wrong", code: 500})
        }
    };
/**
   * Get All surveys
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
    async getAll(req, res) {
   
        try {
            
            let Survey = await app.services.SurveyService.getAll({})
            
          
          return res.json({ flag: true, data: Survey, message: 'success', code: 200 })
        }
        catch(e) {
          return res.json({ flag: false, data: {}, message: e.message, code: 500 })
        }
      }


}
module.exports = new SurveyController()