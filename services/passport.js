const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStategy = require('passport-local');


const localLogin = new LocalStategy({
    usernameField : 'email'
    }, function (email, password, done){
        
        //verify this email and password, call done
        User.findOne({email:email}, function (err,user){
            if(err) return done(err);
            
            //if it is the correct email
            // otherwise, call done with false
            if(!user) return done(null, false);

            // compare the password
            user.comparePassword(password,function(err,isMatch){
                if(err) return done(err);
                if(!isMatch) return done(null, false);

                return done(null,user);
            });
        });
});

const jwtOptions = {
    jwtFromRequest : ExtractJwt.fromHeader('authorization'),
    secretOrKey : config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    // see if the user id in the payload exists in our database
    //if it does, call 'done' with the otherwise
    //otherwise, call 'done' without a user object
    // sub = subject
    
    User.findById(payload.sub, function(err, user){
        //console.log(payload);
        if(err) return done(err,false);
        if (user){
            done(null, user);
        } else{
            done(null,false);
        }
    })
});

passport.use(jwtLogin);
passport.use(localLogin);
