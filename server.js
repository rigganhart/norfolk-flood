var http = require('http');
var port = process.env.PORT;
http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World\n');
<<<<<<< HEAD
}).listen( port );
console.log('Server running on Heroku at port: ' + port );
=======
}).listen( process.env.PORT );
console.log('Server running at http://127.0.0.1:8124/');
>>>>>>> 28b9cee4a544d63ab5a47e8e333aff080b7ece9f
