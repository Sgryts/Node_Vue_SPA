const passport = require('passport')
const config = require('./config/config')
const User = require('./models/User')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.authentication.jwt_encryption
  },
  async function (jwtPayload, done) {
    try {
      const user = await User.findOne({ _id: jwtPayload._id })
      if (!user) {
        return done(new Error(), false)
      }
      return done(null, user)
    } catch (error) {
      return done(new Error(), false)
    }
  })
)

module.exports = null
