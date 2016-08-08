var express = require('express'),
    exphbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    hbsProductsHelper = require('./lib/helpers/products-wrapper'),
    FacebookStrategy = require('passport-facebook').Strategy,
    passport = require('passport'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    configAuth = require('./config/auth'),
    app = express();

// Identify where handlebars files are located, add helpers.
app.engine('.hbs', exphbs({
    extname: '.hbs',
    helpers: {
        wrap_products: hbsProductsHelper
    },
    partialsDir: __dirname + '/views/partials'
}));

// To support JSON-encoded bodies.
app.use(bodyParser.json());

// To support URL-encoded bodies.
app.use(bodyParser.urlencoded({
    extended: true
}));

// Allow usage of cookies.
app.use(cookieParser());

// Setting the view engine to compile handlebars files
app.set('view engine', '.hbs');

// Initializing passport.
app.use(passport.initialize());

app.use(passport.session({
    secret: configAuth.facebookAuth.clientSecret
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});


// Require User model.
var User = require('./models/users');

// Set up facebook configuration for User.
passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL
    },
    function(accessToken, refreshToken, profile, cb) {
        var userInformation = JSON.parse(JSON.stringify(profile));
        function passUserId(id){
            User.addUserIdToWishlistTable(id);
        }
        function doesUserExist(bool) {
            if (bool != '1') {
                User.pushToDataBase(userInformation.id, userInformation.displayName);
            }
        }
        // Check if user already exists in the DB, if not, add them!
        User.seeIfUserExists(userInformation.id, doesUserExist);
        return cb(null, profile);
    }
));

// Serialize passport user.
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// Allowing app to use static CSS and JavaScript files.
app.use(express.static(__dirname));

// Exporting app to use in routes file.
module.exports.app = app;

// Require routes.
require("./routes");

// Start the server.
var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Servers running. Open localhost:' + port);
});
