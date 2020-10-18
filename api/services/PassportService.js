'use strict'

const app = require('../../api')
const constants  = require('../../config/constants')
const passport = require("passport")
const passportJWT = require("passport-jwt")
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

class PassportService {

  /**
   * Initialize Passport JWT strategy
   */
  initializePassport() {

    let jwtOptions = {}

    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    jwtOptions.secretOrKey = constants.JWT_SECRET;
    const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {

      app.models.User.findOne({_id: jwt_payload})
        .then(user=> {
          if (user) {
            next(null, user);
          } else {
            next(null, false);
          }
        })
    });

    passport.use(strategy);
  }
}

module.exports = new PassportService()
