const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session:false});
const requireLogin = passport.authenticate('local', {session:false});

module.exports = function(app){
    app.post('/signup', Authentication.signup)
    app.post('/signin', requireLogin ,Authentication.signin)
    app.get('/', requireAuth, function(req, res, next){
        res.send({hi:'there'})
    })
};
