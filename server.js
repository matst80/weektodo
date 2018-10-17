const path = require('path');
var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');

const privateKey  = fs.readFileSync('./domain.key', 'utf8');
const certificate = fs.readFileSync('./domain.crt', 'utf8');
const port = process.env.PORT || 5011;
const credentials = {key: privateKey, cert: certificate};

var app = express();

//var server = https.createServer(credentials, app);
var server = http.createServer(app);



// API calls
app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});


// Serve any static files
app.use(express.static(path.join(__dirname, 'build')));
// Handle React routing, return all requests to React app
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(port, () => console.log(`Listening on port ${port}`));