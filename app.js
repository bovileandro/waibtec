
/**
 * Module dependencies.
 */

var express = require('express');
var load    = require('express-load');
var http    = require('http');
var path    = require('path');

var app = express();

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




/*MongoDB*/
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/waibtec');

var db = mongoose.connect;

var kittySchema = mongoose.Schema({
    name: String
});

var Kitten = mongoose.model('Kitten', kittySchema);
var silence = new Kitten({ name: 'Silence' })

silence.save(function (err, fluffy) {
  if (err) return console.error(err);
  console.log('salvo com sucesso');
});


//db.on('error', console.error.bind(console, 'connection error:'));

//db.once('open', function callback () {
  //console.log('Banco de dados rodando...');
//});



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
