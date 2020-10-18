const app = require('..');
const nodemailer = require('nodemailer');

class AuthController{
 /**
   * Register
   * @param req
   * @param res
   * @returns {Promise<*>}
   */  
    async create(req,res){
        
    let model =req.body;
    if(!model || !model.email || !model.name || !model.password) {
      return res.json({ flag: false, data: {}, message: 'Missing parameter', code: 500 })
    }

    if(!app.services.AuthService.isValidEmail(model.email))  {
      return res.json({ flag: false, data: {}, message: 'Invalid Email', code: 500 })
    }

        try{
        let user_email = await app.services.AuthService.getOne({email : model.email});
        
        if( !user_email){
            let User = await app.services.AuthService.create(model);
            let {token} = await app.services.AuthService.createAuthToken(User._id);
            
            return res.json({ flag: true, data: { User, token }, message: 'success', code: 200 })
      
        }
       
        return res.json({data:{}, message:"User already exist", code: 500})
           
        }
        catch(e){
            return res.json({data:{}, message:"something went wrong", code: 500})
        }
    };

/**
   * Login
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
    async UserExist(req,res){
           let model =req.body;
        try{

            let User = await app.services.AuthService.getOne({email: model.email,password: model.password});

            if(!User){
                return res.json({data:{}, message:"Username or Password Wrong", code: 500}) 
            }

            let {token} = await app.services.AuthService.createAuthToken(User._id);
            
            return res.json({ flag: true, data: { User, token }, message: 'success', code: 200 })

            
         }
           catch(e){
               console.log(e);
               return res.json({data:{}, message:"something went wrong", code: 500})
           }

    };
/**
   * LogOut
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
    async logout(req, res) {

        let { authorization: token } = req.headers;
        
        if (token.startsWith('bearer ')) {
          // Remove Bearer from string
          token = token.slice(7, token.length);
        }
    
        try {
    
          token && await app.services.AuthService.removeAuthToken(token)
          return res.json({ flag: true, data: {}, message: 'success', code: 200 })
        }
        catch (e) {
          return res.json({ flag: false, data: {}, message: e.message, code: 500 })
        }

    }
/**
   * Reset Password
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async resetpassword(req,res){
    let model =req.body;
    
  try{
    let updatemodel = {};
     let User = await app.services.AuthService.getOne({email: model.email});
     if(!User){
         return res.json({data:{}, message:"Wrong Email entered", code: 500}) 
     }
     
      updatemodel.password = model.password;
     
      User = await app.services.AuthService.update({_id: User.id},updatemodel);
     return res.json({ flag: true, data: 'Password Successfully Reset', message: 'success', code: 200 })

     
  }
    catch(e){
        console.log(e);
        return res.json({data:{}, message:"something went wrong", code: 500})
    }

};


/**
   * Forgot Password
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
    async forgotpassword(req,res){
      let model =req.body;
      
    try{
      let updatemodel = {};
       let User = await app.services.AuthService.getOne({email: model.email});
       if(!User){
           return res.json({data:{}, message:"Wrong Email entered", code: 500}) 
       }
       
        updatemodel.password =  Math.random().toString(36).slice(-8);
        User = await app.services.AuthService.update({_id: User.id},updatemodel);
        
//Email Sent to User' mail id
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'meet14544@gmail.com',
            pass: 'pratyusha99'
          }
        });      
        var mailOptions = {
          from: 'meet14544@gmail.com',
          to: `${User.email}`,
          subject: 'Password Reset Successfully',
          text:  `Your New Password:-${updatemodel.password}`,
          //text : `${password}`
        };
        
       await  transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            return res.json({data:{}, message:"something went wrong", code: 500})
            console.log(error);
          } else {
           // console.log('Email sent: ' + info.response);
          }
        });


        return res.json({ flag: true, data:'Success', message: 'success', code: 200 })
   
    }
      catch(e){
          console.log(e);
          return res.json({data:{}, message:"something went wrong", code: 500})
      }

};    
/**
   * Get All User For Admin
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async getalluserforadmin(req, res) {
   
    try {
        
        let User = await app.services.AuthService.getAll({})
      
      return res.json({ flag: true, data: User, message: 'success', code: 200 })
    }
    catch(e) {
        console.log(e)
      return res.json({ flag: false, data: {}, message: "Something Wrong", code: 500 })
    }
  };
/**
   * Get User By Token
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async getuserbytoken(req, res) {
   
    try {
      //Find id by token
      let { authorization: token } = req.headers;
      if (token && token.startsWith('bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    let tokenuser = await app.models.Token.findOne({token})

    let User = await app.services.AuthService.getOne({_id: tokenuser.user});

      return res.json({ flag: true, data: User, message: 'success', code: 200 })
    }
    catch(e) {
        console.log(e)
      return res.json({ flag: false, data: {}, message: "Something Wrong", code: 500 })
    }
  };
 
/**
   * Update User
   * @param req
   * @param res
   * @returns {Promise<*>}
   */      
  async userupdate(req, res) {
    let reqid = req.params.id;
    let model =req.body;

    if(!model){
      return res.json({ flag: false, data: {}, message: "model does't Exist", code: 500 })
    }
    try {
        let UpdatedUser = await app.services.AuthService.update({_id : reqid} , model)
      return res.json({ flag: true, data: UpdatedUser, message: 'success', code: 200 })
    }
    catch(e) {
      return res.json({ flag: false, data: {}, message: e.message, code: 500 })
    }
  }
  

}
module.exports = new AuthController()
