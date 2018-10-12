const passport = require('passport')
const token = require('../config/config').authentication.jwt_encryption
const User = require('../models/User')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

passport.use(
  new JwtStrategy({
    _jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    _secretOrKeyProvider: token
  }),
  async function (jwtPayload, done) {
    try {
      const user = await User.findOne({_id: jwtPayload.id})
      if (!user) {
        return done(new Error(), false)
      }
      return done(null, user)
    } catch (error) {
      return done(new Error(), false)
    }
  }
)

module.exports = null
