const express = require('express');
const session = require('express-session');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// DB Setup
// mongoose.connect('mongodb://localhost/auth');

//Dev Setup

mongoose.connect("mongodb+srv://MaahyarAzad:SagPedar%409508@clusterzero.jn5oj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
 {useNewUrlParser: true},
 {useUnifiedTopology: true});


// App Setup
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret:"HelloWorld"
}));

app.use(express.json())
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
