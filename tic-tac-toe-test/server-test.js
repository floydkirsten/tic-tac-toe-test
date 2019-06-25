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


let WebSocket = require('ws');
let wss = new WebSocket.Server({port:8000})

wss.on('connection', ws => {
    ws.on('message', message => {
        console.log('Recieved message => ${message}')
    })
    ws.send('hello')
})