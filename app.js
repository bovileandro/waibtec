
/**
 * Module dependencies.
 */

var express  = require('express');
var load     = require('express-load');
var http     = require('http');
var path     = require('path');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/waibtec', function(err){
  if (err){
    console.log('Erro ao conectar no mongodb: '+err);
  }
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
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

load('models').then('controllers').then('routes').into(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
