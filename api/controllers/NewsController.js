const app = require('..')
const moment = require('moment')

class NewsController{
/**
   * Create a News
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
           
            let News = await app.services.NewsService.create(model);
           
            return res.json({data:News, message:"Success", code: 200})
        }
        catch(e){
            console.log(e);
            return res.json({data:{}, message:"something went wrong", code: 500})
        }
    };
/**
   * Get All News After Current Date (Public)
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
    async getAll(req, res) {
   
        try {
            
            let News = await app.services.NewsService.getAll({})
            var cur_date = moment();
            let MapNews = News.map((news)=>{ if(!moment().isAfter(news.lastdate)) return news });
            
            return res.json({ flag: true, data: MapNews, message: 'success', code: 200 })
        }
        catch(e) {
          return res.json({ flag: false, data: {}, message: e.message, code: 500 })
        }
      }
/**
   * Get All News
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async getAllforadmin(req, res) {
   
    try {
        
        let News = await app.services.NewsService.getAll({})
        
      
      return res.json({ flag: true, data: News, message: 'success', code: 200 })
    }
    catch(e) {
        console.log(e)
      return res.json({ flag: false, data: {}, message: "Something Wrong", code: 500 })
    }
  }      
/**
   * Update News
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
      async update(req,res){
        let model =req.body;
        let { id  } = req.params;
      try{
        
         let News = await app.services.NewsService.getOne({_id : id });
         if(!News) throw new Error('News does not exists')
        
          News = await app.services.NewsService.update({_id: News.id},model);
         return res.json({ flag: true, data: News, message: 'success', code: 200 })
      }
        catch(e){
            console.log(e);
            return res.json({data:{}, message:"something went wrong", code: 500})
        }
  
  };




}
module.exports = new NewsController()