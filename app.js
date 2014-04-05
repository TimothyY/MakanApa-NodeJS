
/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

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

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});