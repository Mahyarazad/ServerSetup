const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;
const bcrypt  = require('bcrypt-nodejs');

// Define our model

const userSchema = new Schema({
    email: {type: String, unique: true, lowercase: true},
    password: {type: String}, 
    token: {type: String}
})

//on save hook encrypt password
userSchema.pre('save', function(next){
    const user = this;

    bcrypt.genSalt(10,function(err, salt){
        if (err) {return next(err);}

        bcrypt.hash(user.password, salt, null ,function(err,hash){
            if (err) {return next(err);}
            user.password = hash;
            next();
        });
    })
});

//Create a model class
userSchema.methods.comparePassword = function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, function(err,isMatch){
        if(err) return callback(err);
        callback(null,isMatch);
    })
};
const modelClass = mongoose.model('user', userSchema); 

//Export 
module.exports = modelClass; 
