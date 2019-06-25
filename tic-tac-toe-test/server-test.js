var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {

    function callback(err, data) {``
        console.log(req.url);
        if (err) throw err;
        let contentType = "text/html";
        if (req.url === '/style-test.css') contentType = "text/css";
        if (req.url === '/server-test.js') contentType = "application/javascript";
        console.log(contentType);
        res.writeHead(200, { 'Content-Type': contentType });
        res.write(data);
        res.end();
    }
    if (req.url === '/') fs.readFile('./display-test.html', callback)
    else if (req.url !== '/favicon.ico'){
        console.log(req.url);
        fs.readFile("." + req.url, callback);
    }

}).listen(8000);


/*
var express = require('express'),
    app = express()
http = require('http').Server(app);

app.use(express.static('public'));

app.get('/', function (req,res) {
    res.sendFile(__dirname + '/display-test.html');
});

let port = 8000;

http.listen(port, function () {
    console.log('Tic-tac-toe on port 8000');
});
*/
