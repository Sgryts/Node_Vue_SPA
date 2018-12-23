const passport = require('passport')

module.exports = function (req, res, next) {
  passport.authenticate('jwt', function (err, user) {
    console.log('userrrr', user, err)
    if (err || !user) {
      res.status(403).send({
        error: 'Not Authorized ' + err
      })
    } else {
      req.user = user
      next()
    }
  })(req, res, next)
}
