const User = require('../models/user');
const jwt = require('jwt-simple');
const config = process.env.APP_SECRET;


function tokenForUser(user){
    const timeStamp = new Date().getTime;
    return jwt.encode({sub:user.id , iat:timeStamp}, config);
}

exports.signup = function(req, res, next) {
    // see if a user with the given name already exists

    const email = req.body.email;
    const password = req.body.password;

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    if (!email || !password) {
        return res.status(422).send({message: 'You must provide email and password'});
    };
    if (!validateEmail(email)) {
        return res.status(422).send({message: 'You must provide correct email'});
    };
    
    


    User.findOne({ email: email}, function(err, existingUser){

        if(err){ return next(err); }

        if(existingUser){
            return res.status(422).send({ message:"Email does exists already"});

        }
    
        const user = new User({
            email: email,
            password: password,
            token:''
        });

        user.save(function(err){
            const token = {token: tokenForUser(user)};
            User.findOneAndUpdate({email:email}, token, {upsert: true},function(err) {
                if (err) return res.send(500, {error: err});
                
            });
            if(err){ return next(err); }
            res.json({token: tokenForUser(user), email: email, uid: user._id});
        });

    });
}


exports.signin =  function(req, res, next) {

    console.log(req);

    const email = req.body.email;
    const password = req.body.password;
    
    if (!email || !password) {
        return res.status(422).send({message: 'You must provide email and password'});
        
    } else {

        req.session.uid = req.user._id;
        res.send({token: tokenForUser(req.user), email: req.body.email, uid: req.user._id});
        
    }
   
}

