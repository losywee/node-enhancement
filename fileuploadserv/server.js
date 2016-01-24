var formidable= require('formidable'); //high speed file upload
var http= require('http');
//var util =require('util');
var form= require('fs').readFileSync('form.html');

http.createServer(function(request, response){

if(request.method == 'POST') {

  var incoming= new formidable.IncomingForm();
  incoming.uploadDir = '/tmp';
  incoming.on('file', function(filed, file) {
    if(!file.size) { return; }
    response.write(file.name + 'received\n');

}).on('end', function() {
  
  response.end('all file received!');
});

  incoming.parse(request);

}

if(request.method == 'GET'){

response.writeHead(200, {'Content-type': 'text/html'});
response.end(form);

}

}).listen(8089);

