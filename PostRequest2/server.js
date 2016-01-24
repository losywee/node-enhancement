var connect= require('connect');
var bodyParser= require('body-parser');
var util= require('util');
var getRawBody = require('raw-body');

var app= connect();
var form=require('fs').readFileSync('form.html');

app.use(bodyParser.urlencoded());
app.use(function(request, response){

if(request.method === 'GET') {

response.writeHead(200, {'content-type': 'text/html'});
response.end(form);
}
if(request.method === 'POST') {
getRawBody(request, {length: request.headers['content-length'],limit: '2mb'},function(err, res) {

if(err) return;

});
console.log('request body:\n', request.body);
response.end('you posted:\n' + util.inspect(request.body));
}

});
app.listen(8089);
/*
function(req) {getRawBody(req, {limit: '2mb'}); console.log('g');}, function(request, response){

console.log('run');



}*/
