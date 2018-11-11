const passport = require('passport')
const config = require('./config/config')
const User = require('./models/User')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

console.log('PASS')
passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.authentication.jwt_encryption
  },
  async function (jwtPayload, done) {
    console.log('PASS-TRY-0', jwtPayload)
    try {
      console.log('PASS-TRY')
      const user = await User.findOne({ _id: jwtPayload._id })
      console.log('UZZZ-1', user)
      if (!user) {
        console.log('PASS-TRY-ERR')
        return done(new Error(), false)
      }
      return done(null, user)
    } catch (error) {
      console.log('PASS-CATCH')
      return done(new Error(), false)
    }
  })
)

module.exports = null
