const passport = require('passport') //install passport
const LocalStrategy = require('passport-local').Strategy
const { getAllUsers} = require('./database')

passport.use(
    new LocalStrategy((username, password, done) => {
        //  strategy as in how to authenticate this user
        getAllUsers().then(users => users.find(user => user.username == username))
        .then((user) => {
            if (!user) {
                return done(new Error('Username invalid'))
            }
            
            if (user.password != password) {
                return done(null, false)
            }
            
            done(null, user)
        })
        .catch(done)
    }),
    )
    
    
    
    passport.serializeUser((user, done) => {
        done(null, user.username)
    })
    
    passport.deserializeUser((username, done) => {
        getAllUsers().then(users => users.find(user => user.username == username))
        .then((user) => done(null, user))
        .catch(done)
    })
    
    module.exports = passport