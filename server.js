
var PORT = process.env.PORT || 8080;
const path = require('path');
const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
var flash = require('connect-flash');
const bodyParser = require('body-parser');
require('dotenv').config();
const exphbs = require('express-handlebars');
//chat
var http = require('http').Server(app);
var io = require('socket.io')(http, {
  pingInterval: 500
});

// BodyParser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Passport
app.use(
  session({
    secret: "secret1123",
    resave: true,
    saveUninitialized: true
  })
); // session secret
app.use(passport.initialize());
app.use(passport.session());
var passportOneSessionPerUser=require('passport-one-session-per-user');
passport.use(new passportOneSessionPerUser());
app.use(passport.authenticate('passport-one-session-per-user'));
app.use(flash());


// Handlebars
const viewsPath = path.join(__dirname, 'views');
const layoutsPath = path.join(viewsPath, 'layouts');
const partialsPath = path.join(viewsPath, 'partials');
app.set('views', viewsPath);

const exphbsConfig = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: layoutsPath,
  partialsDir: [partialsPath],
  extname: '.hbs'
});

app.engine('hbs', exphbsConfig.engine);
app.set('view engine', '.hbs');

// Models
const models = require('./models');

// Express static assets
app.use(express.static("public"));

// Routes
const authRoute = require('./controllers/auth.js')(app, passport);

// Load passport strategies
require('./config/passport/passport.js')(passport, models.user);

//socket io connection 
io.on('connection', function (socket) {
  console.log('a user connected on socket: ' + socket.id);
  socket.on('chat message', function (msg) {
    io.emit('new message', msg);
  });
  socket.on('disconnect', function () {
    console.log('user disconnected from socket ' + socket.id);

  });
});

models.sequelize
.sync()
.then(function(){
  console.log('Database Connected');
  http.listen(PORT, function(err){
    if (!err) console.log('Connected at Port:'+ PORT);
    else console.log(err);
  });
})
.catch(function (err) {
  console.log(err, 'Error on Database Sync. Please try again!');
});





module.exports = app;