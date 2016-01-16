var http = require('http');
var url = require("url");

var querystring = require('querystring');

var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var hat = require('hat');
var sha1 = require('password-hash');
var upload = multer({ dest: 'uploads/' });

var app = express();

//var pg = require('pg');

/*var mysql = require('mysql');
var connection = mysql.createConnection({
	host	: 'localhost',
	user 	: 'root',
	password: '',
	database: 'hackaton42'
});*/

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

app.post('/users', function (req, res) {
	'use strict';
	if ( req.body.nom && req.body.prenom && req.body.email && req.body.password && req.body.phone) {
		var aquery = connection.query('SELECT * FROM users WHERE email = ?', req.body.email, function (err, rows) {
			if (err) {
				console.log('fail to find users');
			} else {
				if (rows.length < 1) {
					var query = connection.query('INSERT INTO users (nom, prenom, email, password, phone) VALUES (?, ?, ?, ?, ?)', [req.body.nom, req.body.prenom, req.body.email, req.body.password, req.body.phone], function (err, rows) {
						if (err) {
							console.log(err);
						} else {
							res.send({error: false, data: []});
						}
					});
				} else {
					res.send({error: 'Email déjà utilisée.', data: []});
				}
			}
		});
	}
})

app.listen(3000);