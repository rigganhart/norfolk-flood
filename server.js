var http = require('http');
var express = require('express');
var mongoDB = require('mongoDB');


http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World\n');
}).listen( process.env.PORT );
console.log('Server running at http://127.0.0.1:8124/');
