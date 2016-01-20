var url = require("url");

var querystring = require('querystring');

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var http = require('http');
/*var connection = mysql.createConnection({
	host	: 'localhost',
	user 	: 'root',
	password: '',
	database: 'hackaton'
});
*/



var mysql = require('mysql');

OPENSHIFT_MYSQL_DB_PORT = ;


OPENSHIFT_MYSQL_DB_HOST = "";

OPENSHIFT_MYSQL_DB_PASSWORD = "";

OPENSHIFT_MYSQL_DB_USERNAME = "";

var connection = mysql.createConnection({
  host     : process.env.OPENSHIFT_MYSQL_DB_HOST,
  port     : process.env.OPENSHIFT_MYSQL_DB_PORT,
  user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME,
  password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
  database : 'meet'
});

app.use(function (req, res, next) {
    // autorise quelle site a envoyer des donné (ici tout le monde)
    res.setHeader('Access-Control-Allow-Origin', '*');
    // quelle type de requete sont autoriser
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // OBLIGER SINON PAS DE RECEPTION DE DATA !!
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Pour l'API
    res.setHeader('Access-Control-Allow-Credentials', true);
    //Pour continuer dnas les autres function
    next();
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.get('/', function (req, res) {

res.send('hello world');

})

app.post('/', function (req, res) {
	'use strict';
	res.send(req.latitude);
	res.send(req.longitude);

	var query = connection.query('INSERT INTO marker (latitude, longitude) VALUES (?, ?)', [req.body.latitude, req.body.longitude], function (err, rows) {
		if (err) {
			console.log(err);
		} else {
			res.send({error: false, data: []});
		}
	})
})

var port = process.env.OPENSHIFT_NODEJS_PORT ||  process.env.OPENSHIFT_INTERNAL_PORT || 8080;  
var ipaddr = process.env.OPENSHIFT_NODEJS_IP || process.env.OPENSHIFT_INTERNAL_IP || 'localhost';  
app.listen(port, ipaddr);
