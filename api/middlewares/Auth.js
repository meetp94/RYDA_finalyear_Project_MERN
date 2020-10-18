'use strict'
const app = require('../../api')

class Auth {

  /**
   * Check if token exist in DB or not, if not then unauthorized
   * @param req
   * @param res
   * @param next
   */
  validateToken(req, res, next) {

    let { authorization: token } = req.headers;
    if (token && token.startsWith('bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    app.models.Token.findOne({token})
    .then(token=> {
      if(token) return next()
      return res.status(401).send('Unauthorized')
    })
  }

}
module.exports = new Auth()