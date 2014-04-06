
/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

////////////////////////////////////////////////////////////////////////////////////////////
passport.use(new FacebookStrategy({
    clientID: "1464692647095538",
    clientSecret: "3d2b728362149f6e4b1eaa5a0751891d",
    //callbackURL: "http://www.example.com/auth/facebook/callback"
    callbackURL: "http://insanelysaneme.azurewebsites.net/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
    //User.findOrCreate(..., function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));
///////////////////////////////////////////////////////////////////////////////////////////

var app = express();

GLOBAL.makanapaDB={
	arrayRestaurant:['Pizza Hut','Burger King']
}

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

//declaring how user access our REST API and what callback is used in response.
app.get("/makanapa",routes.makanapa);
app.get("/makanapabackend",routes.makanapabackend);
app.post("/makanapabackend/addrestaurant",routes.addrestaurant);

app.post("/getrestaurant",routes.getrestaurant);

///////////////////////////////////////////////////////////////////////////////////////////
// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/makanapa',
                                      failureRedirect: '/' }));
                                      
///////////////////////////////////////////////////////////////////////////////////////////
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});