'use strict';

// load modules
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const socket = require('socket.io');
const weather = require('./weather');


// load keys and certificates
var options = {
    key: fs.readFileSync(__dirname + '/../cert/server.key'),
    cert: fs.readFileSync(__dirname + '/../cert/server.crt'),
    ca: fs.readFileSync(__dirname + '/../cert/ca.crt')
};

// create an express app to serve the static files in the 'public' folder
var app = express();
app.use(express.static('public'));

// create http and https server
var httpServer = http.createServer(app);
var httpsServer = https.createServer(options, app);

// create socket.io instance: use both servers
var io = socket()
    .listen(httpServer)
    .listen(httpsServer);

// cache
var cache = null;

// weather generator
var generator = weather.createGenerator(function (weather) {

    // update the cache
    cache = weather;

    // new meteo update -> push it to all the connected clients
    io.emit('weather', weather);
});

// when a client connects -> push the last available data
io.on('connect', function (socket) {
    if (cache) {
        socket.emit('weather', cache);
    }
});

// run weather generator
generator.run();

// run http server
var httpPort = process.env.PORT || 8080;
httpServer.listen(httpPort, function () {
    console.log('HTTP server listening at port %d', httpPort);
});

// run https server
var httpsPort = process.env.PORT_HTTPS || 8443;
httpsServer.listen(httpsPort, function () {
    console.log('HTTPS server listening at port %d\n', httpsPort);
});
