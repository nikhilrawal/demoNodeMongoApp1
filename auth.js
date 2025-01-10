const person = require('./models/person')
const passport = require('passport')
LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy(async (userrname, passsword, done) => {
    try {
        prsn = await person.findOne({ username: userrname })
        if (!prsn) {
            return done(null, false, { message: 'User not found' })
        }
        pass = await prsn.comparePassword(passsword)
        if (pass) {
            console.log('this is required', userrname, passsword)
            return done(null, prsn)
        }
        else {
            return done(null, false, { message: 'Password is incorrect' })
        }

    } catch (err) {
        return done(err)
    }
}))
module.exports = passport